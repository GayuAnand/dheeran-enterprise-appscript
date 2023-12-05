import { Injectable } from '@angular/core';
import { Directory, Encoding, FileInfo, Filesystem, GetUriOptions } from '@capacitor/filesystem';
import { environment } from 'src/environments/environment';

export interface IInfoJson {
  [key: string]: { lastUpdatedAt: number } | null
}

@Injectable()
export class ApiFileSystemService {
  dataDir = Directory.Data;

  infoJsonName = 'info.json';

  async cleanupUnknownFiles(includeDataDir = false) {
    (await Filesystem.readdir({ path: '', directory: this.dataDir })).files
      .forEach(async (file) => {
        if (file.type === 'file') {
          Filesystem.deleteFile({ path: file.name, directory: this.dataDir });
        } else if (file.type === 'directory') {
          // Skip versions (used by CapacitorUpdater) directory
          if (file.name === 'versions') return;

          // Skip data files
          if (file.name === 'data') {
            if (includeDataDir) {
              const infoJson = await this.readInfoJson();
              const newInfoJson = { prodDeployId: infoJson?.prodDeployId || null };
              const token = await this.readDataFromFile('x-auth-token');
              await Filesystem.rmdir({ path: file.name, directory: this.dataDir, recursive: true });
              if (token) await this.writeDataToFile('x-auth-token', token);
              this.writeInfoJson(newInfoJson);
            }
            return;
          }

          Filesystem.rmdir({ path: file.name, directory: this.dataDir, recursive: true });
        }
      })
  }

  private getDataFilePath(filename: string) {
    return 'data/' + filename;
  }

  async writeDataToFile<T>(filename: string, data: string | any): Promise<T> {
    if (!environment.production) console.log(`Writing ${JSON.stringify(data)} to ${filename}...`);
    data = data || '';
    await Filesystem.writeFile({ path: this.getDataFilePath(filename), directory: this.dataDir, encoding: Encoding.UTF8, data: JSON.stringify(data), recursive: true });
    return this.readDataFromFile<T>(filename);
  }

  async readDataFromFile<T>(filename: string): Promise<T> {
    if (await this.checkFileExists(filename)) {
      let fileData: any = (await Filesystem.readFile({ path: this.getDataFilePath(filename), directory: this.dataDir, encoding: Encoding.UTF8 })).data as string;
      try {
        fileData = JSON.parse(fileData);
      } catch(e) {
        console.error(`Parsing error while reading file data '${filename}'.`);
      }
      if (!environment.production) console.log(`Read ${JSON.stringify(fileData)} from ${filename}...`);
      return Promise.resolve(fileData);
    }
    return Promise.resolve(null as T);
  }

  async deleteDataFile(filename: string) {
    if (await this.checkFileExists(filename)) {
      await Filesystem.deleteFile({ path: this.getDataFilePath(filename), directory: this.dataDir });
    }
    return Promise.resolve(true);
  }

  async readInfoJson(): Promise<IInfoJson> {
    if (!(await this.checkFileExists(this.infoJsonName))) {
      await this.writeDataToFile(this.infoJsonName, {});
    }
    return this.readDataFromFile(this.infoJsonName);
  }

  async writeInfoJson(info: any): Promise<IInfoJson> {
    return this.writeDataToFile(this.infoJsonName, info);
  }

  async updateInfoJson(infoPatch: IInfoJson) {
    const infoObj = await this.readInfoJson();
    return this.writeInfoJson(Object.assign({}, infoObj || {}, infoPatch));
  }

  async checkFileExists(filename: string): Promise<boolean> {
    try {
      await Filesystem.stat({ path: this.getDataFilePath(filename), directory: this.dataDir });
      return true;
    } catch (checkDirException: any) {
      if (checkDirException.message === 'File does not exist') {
        return false;
      } else {
        throw checkDirException;
      }
    }
  }

  async deleteFileOrFolder(filePath: string, isDir = false) {
    if (isDir) {
      return await Filesystem.rmdir({ path: filePath, directory: this.dataDir, recursive: true });
    } else {
      return await Filesystem.deleteFile({ path: filePath, directory: this.dataDir });
    }
  }

  async listDir(path = '', recursive = false) {
    const files = (await Filesystem.readdir({ path, directory: this.dataDir })).files;
    files.forEach((f) => (f as any).path = `${path ? path + '/' : ''}${f.name}`);

    if (recursive) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.type === 'directory') {
          (file as any).children = await this.listDir(`${path ? path + '/' : ''}${file.name}`, true);
        }
      }
    }

    return files;
  }
}
