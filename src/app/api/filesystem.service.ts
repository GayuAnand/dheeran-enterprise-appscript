import { Injectable } from '@angular/core';
import { Directory, Encoding, Filesystem, GetUriOptions } from '@capacitor/filesystem';

@Injectable()
export class FileSystemService {
  dataDir = Directory.Data;

  infoJsonName = 'info.json';

  async cleanupUnknownFiles() {
    (await Filesystem.readdir({ path: '', directory: this.dataDir })).files
      .forEach((file) => {
        if (file.type === 'file') {
          Filesystem.deleteFile({ path: file.name, directory: this.dataDir });
        } else if (file.type === 'directory') {
          // Skip data and versions (used by CapacitorUpdater) directory
          if ((file.name !== 'data') && (file.name !== 'versions')) {
            Filesystem.rmdir({ path: file.name, directory: this.dataDir, recursive: true });
          }
        }
      })
  }

  private getDataFilePath(filename: string) {
    return 'data/' + filename;
  }

  async writeDataToFile(filename: string, data: string | any) {
    data = data || '';
    const dataStr = (typeof data === 'string') ? data : data.toString()
    return (await Filesystem.writeFile({ path: this.getDataFilePath(filename), directory: this.dataDir, encoding: Encoding.UTF8, data: dataStr, recursive: true })).uri || '';
  }

  async readDataFromFile(filename: string) {
    if (await this.checkFileExists(filename)) {
      return JSON.parse((await Filesystem.readFile({ path: this.getDataFilePath(filename), directory: this.dataDir, encoding: Encoding.UTF8 })).data.toString() || '""');
    }
    return null;
  }

  async readGSheetData(sheetName: string) {
    if (await this.checkFileExists(sheetName)) {
      return (await this.readInfoJson())[sheetName] || null;
    }
    return null;
  }

  async writeGSheetData(sheetName: string, data: any) {
    await this.writeDataToFile(sheetName, data);
    const infoJson = await this.readInfoJson();
    infoJson[sheetName] = { timestamp: Date.now() };
    await this.writeDataToFile(this.infoJsonName, infoJson);
  }

  async readInfoJson() {
    if (!(await this.checkFileExists(this.infoJsonName))) {
      await this.writeDataToFile(this.infoJsonName, {});
    }
    return this.readDataFromFile(this.infoJsonName);
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

  async listDir(path = '') {
    return (await Filesystem.readdir({ path, directory: this.dataDir })).files;
  }
}
