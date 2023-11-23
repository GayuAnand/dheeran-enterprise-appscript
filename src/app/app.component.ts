import { Component } from '@angular/core';
import { Browser } from '@capacitor/browser';
import { FileOpener } from '@capawesome-team/capacitor-file-opener';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

import { CapacitorUpdater, BundleInfo } from '@capgo/capacitor-updater';
import { SplashScreen } from '@capacitor/splash-screen';
import { App } from '@capacitor/app';

import { BaseComponent } from './common';

async function downloadAndSaveFile(url: string, directory: Directory, filename: string): Promise<string | undefined> {
  try {
    // Download the file
    const response = await Filesystem.downloadFile({
      url: url,
      path: filename,
      directory: directory,
      method: 'GET',
    });

    // Log the downloaded file's URI
    console.log('Downloaded file URI:', response.path);

    return response.path;
  } catch (error) {
    console.error('Error downloading file:', error);
    return 'Error downloading file:' + error;
  }
}

@Component({
  selector: 'de-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent extends BaseComponent {
  name = 'test';
  version = '0.0.1-beta';
  msg = '';
  logs: string[] = [];

  constructor() {
    super();
    let version: BundleInfo;
    App.addListener('appStateChange', async (state) => {
      this.logs.push(`App state changed to ${state.isActive ? 'Active' : 'Inactive'}.`);
      if (state.isActive) {
        // Ensure download occurs while the app is active, or download may fail
        version = await CapacitorUpdater.download({
          url: 'https://gayuanand.github.io/dheeran-enterprise-appscript/0.0.1.zip',
          version: '0.0.1',
        });
        this.logs.push(`Package downloaded successfully. Version: ${version.version}`);
      }
  
      if (!state.isActive && version) {
        return;
        this.logs.push(`App state is inactive. Showing splash screen.`)
        // Activate the update when the application is sent to background
        SplashScreen.show();
        try {
          this.logs.push(`Setting version to ${version.version}`);
          await CapacitorUpdater.set(version);
          // At this point, the new version should be active, and will need to hide the splash screen
        } catch (e) {
          this.logs.push(`Hiding splash screen. ERROR: ${e}`)
          SplashScreen.hide() // Hide the splash screen again if something went wrong
        }
      }
    });
  }

  async mkdir() {
    try {
      await Filesystem.mkdir({ path: this.name, directory: Directory.Data, recursive: true });
      this.msg = 'Successfully created dir: ' + this.name;
    } catch(e) {
      this.msg = 'Error in creating directory: ' + e;
    }
  }

  async readdir() {
    try {
      const readdirResult = await Filesystem.readdir({ path: this.name, directory: Directory.Data });
      this.msg = 'Directory contents: ' + readdirResult.files.map(f => f.name);
    } catch (e) {
      this.msg = 'Error in reading directory: ' + e;
    }
  }

  async getFilePath() {
    this.msg = (await Filesystem.getUri({ path: this.name, directory: Directory.Data })).uri;
  }

  async openFile() {
    function getMimeType(name: string) {
      const splits = name.split('.');
      const extension = splits[splits.length - 1];
      const mimetypes: Record<string, string> = {
        apk: 'application/vnd.android.package-archive',
      };

      return mimetypes[extension] || '';
    }

    const uri = (await Filesystem.getUri({ path: this.name, directory: Directory.Data })).uri;
    const mimeType = getMimeType(this.name);
    // const uri = this.name;
    try {
      if (mimeType) {
        await FileOpener.openFile({ path: uri, mimeType: mimeType });
      } else {
        await FileOpener.openFile({ path: uri });
      }
      this.msg = 'Open file successful. ' + uri;
    } catch(e) {
      this.msg = 'Error in opening file: ' + uri + ':::' + e;
    }
  }

  async cleandir() {
    try {
      const readdirResult = await Filesystem.readdir({ path: this.name, directory: Directory.Data });
      for (let i = 0; i < readdirResult.files.length; i++) {
        const file = readdirResult.files[i];
        if (file.type === 'directory') {
          await Filesystem.rmdir({ path: file.name, directory: Directory.Data, recursive: true });
        } else {
          await Filesystem.deleteFile({ path: file.name, directory: Directory.Data });
        }
      }
    } catch(e) {
      this.msg = 'Error in cleaning up dir: ' + e;
    }
  }

  async listPackages() {
    this.logs.push((await CapacitorUpdater.list()).bundles.map(b => `${b.id}:${b.version}`).join('\n'));
  }

  async readFile() {
    const versions = (await Filesystem.readFile({ path: 'apkversions.json', directory: Directory.Data, encoding: Encoding.UTF8 })).data as string;
    this.logs.push(versions);
    try {
      const j = JSON.parse(versions);
      this.logs.push(Object.keys(j).join(','));
      this.logs.push(Object.values(j).join(','));
    } catch(e) {
      this.logs.push('Error in parsing json from versions file');
    }
  }

  async downloadFile() {
    this.msg = await downloadAndSaveFile(' https://gayuanand.github.io/dheeran-enterprise-appscript/apkversions.json', Directory.Data, 'apkversions.json') || '';
  }

  async downloadApk() {
    this.msg = await downloadAndSaveFile('https://gayuanand.github.io/dheeran-enterprise-appscript/app.apk', Directory.Data, 'app.apk') || '';

    // await Browser.open({ url: 'https://gayuanand.github.io/dheeran-enterprise-appscript/app.apk' });
  }
}

