import { Injectable } from '@angular/core';
import { Directory, Encoding, Filesystem } from '@capacitor/filesystem';

@Injectable()
export class FileSystemService {
  dataDir = Directory.Data;

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

  async writeDataToFile(filename: string, data: string) {
    return (await Filesystem.writeFile({ path: this.getDataFilePath(filename), directory: this.dataDir, encoding: Encoding.UTF8, data, recursive: true })).uri || '';
  }

  async readDataFromFile(filename: string) {
    return (await Filesystem.readFile({ path: this.getDataFilePath(filename), directory: this.dataDir, encoding: Encoding.UTF8 })).data.toString() || '';
  }

  async listDir(path = '') {
    return (await Filesystem.readdir({ path, directory: this.dataDir })).files;
  }
}
