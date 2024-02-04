import { App } from '@capacitor/app';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SettingsService } from './settings.service';
import { SplashScreen } from '@capacitor/splash-screen';
import { BundleInfo, CapacitorUpdater } from '@capgo/capacitor-updater';

@Injectable()
export class UiBundleUpdaterService {
  version!: BundleInfo;

  latestVersionInfo!: { url: string, version: string };

  constructor(
    private settingsService: SettingsService,
    private http: HttpClient,
  ) {}

  async initialize() {
    if (this.settingsService.isNative) {
      await this.getLatestVersionInfo();
      await this.cleanupUnusedUiBundles();
      this.registerAppStateChange();
    }
  }

  async getLatestVersionInfo() {
    return this.http.get(this.settingsService.getAssetUrl('versionInfo.json'))
      .subscribe(
        (res: any) => {
          this.latestVersionInfo = {
            url: this.settingsService.getAssetUrl(`${res.latest}.zip`),
            version: res.latest
          };
        }
      );
  }

  async cleanupUnusedUiBundles() {
    const downloadedBundles = (await CapacitorUpdater.list()).bundles;
    return Promise.all(downloadedBundles
      .filter((bundle) => bundle.version !== this.settingsService.currentVersion)
      .map((bundle) => CapacitorUpdater.delete(bundle)));
  }

  registerAppStateChange() {
    App.addListener('appStateChange', async (state) => {
      this.getLatestVersionInfo();
      if (state.isActive && this.hasUpdate) {
        try {
          // Ensure download occurs while the app is active, or download may fail
          this.version = await CapacitorUpdater.download(this.latestVersionInfo);
        } catch(e) {
        }
      }
  
      if (!state.isActive && this.version) {
        // Activate the update when the application is sent to background
        SplashScreen.show();
        try {
          await CapacitorUpdater.set(this.version);
          // At this point, the new version should be active, and will need to hide the splash screen
        } catch (e) {
          SplashScreen.hide() // Hide the splash screen again if something went wrong
        }
      }
    });
  }

  get hasUpdate(): boolean {
    return this.latestVersionInfo && (this.latestVersionInfo.version !== this.settingsService.currentVersion);
  }
}
