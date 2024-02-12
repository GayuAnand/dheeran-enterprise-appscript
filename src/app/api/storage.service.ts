import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { Observable, concatMap, from, map, of } from 'rxjs';

import { ApiFileSystemService } from './filesystem.service';
import { CustomerModel } from '../models';

const INFO_JSON_KEY = 'info.json';
const CABLE_OFFLINE_UPDATE_FILENAME = 'cable-offline-update.json';
const NKL_CABLE_OFFLINE_UPDATE_FILENAME = 'nkl-cable-offline-update.json';

@Injectable()
export class ApiStorageService {
  isNative = Capacitor.isNativePlatform();

  constructor(private fs: ApiFileSystemService) {}

  getOfflineCableFilename(nklAccount = false) {
    return nklAccount ? NKL_CABLE_OFFLINE_UPDATE_FILENAME : CABLE_OFFLINE_UPDATE_FILENAME;
  }

  setData<T>(key: string, data: T): Observable<T> {
    let retval = of(data);

    try {
      if (this.isNative) {
        retval = from(this.fs.writeDataToFile<T>(key, data));
      } else {
        localStorage.setItem(key, JSON.stringify(data));
      }
      retval = retval.pipe(concatMap(() => this.getData<T>(key)));
    } catch(e) {
      console.error(`Error in setting data to file '${key}'.`);
    }

    return retval.pipe(
      concatMap((res) => {
        let updateJsonObservable: Observable<any>;
        const infoPatch = { [key]: { lastUpdatedAt: Date.now() }};

        if (this.isNative) {
          updateJsonObservable = from(this.fs.updateInfoJson(infoPatch));
        } else {
          localStorage.setItem(INFO_JSON_KEY, JSON.stringify(Object.assign({}, JSON.parse(localStorage.getItem(INFO_JSON_KEY) || '{}'), infoPatch)));
          updateJsonObservable = of(null);
        }

        return updateJsonObservable.pipe(map(() => res));
      })
    );
  }

  getData<T>(key: string): Observable<T> {
    let retval = of(null as T);

    try {
      if (this.isNative) {
        retval = from(this.fs.readDataFromFile<T>(key));
      } else {
        retval = of(JSON.parse(localStorage.getItem(key) || 'null') as T);
      }
    } catch(e) {
      console.error(`Error in getting '${key}' data.`);
    }

    return retval;
  }

  getCableOfflieData(nklAccount = false): Observable<any[]> {
    let retval = of([] as any[]);
    const cableOfflineUpdateFilename = this.getOfflineCableFilename(nklAccount);

    try {
      if (this.isNative) {
        retval = from(this.fs.readDataFromFile<any[]>(cableOfflineUpdateFilename));
      } else {
        retval = of(JSON.parse(localStorage.getItem(cableOfflineUpdateFilename) || '[]'));
      }
    } catch (e) {
      console.error(`Error in getting '${cableOfflineUpdateFilename}' data.`);
    }

    return retval;
  }

  updateCableOfflineData(payload: CustomerModel | CustomerModel[], idKey: keyof CustomerModel, reset = false, nklAccount = false) {
    payload = Array.isArray(payload) ? payload : [payload];
    let retval = of([] as any[]);
    const cableOfflineUpdateFilename = this.getOfflineCableFilename(nklAccount);

    function mergeData(oldData: any[]) {
      oldData = oldData || [];
      oldData = Array.isArray(oldData) ? oldData : [];
      (payload as CustomerModel[]).forEach((p) => {
        const index = oldData.findIndex(d => p[idKey] === d[idKey]);

        if (index >= 0) {
          oldData.splice(index, 1, Object.assign({}, oldData[index], p));
        } else {
          oldData.push(p);
        }
      });
      return oldData;
    }

    try {
      if (this.isNative) {
        retval = this.getCableOfflieData(nklAccount)
          .pipe(
            map((data) => mergeData(reset ? [] : data)),
            concatMap((data) => this.fs.writeDataToFile<any[]>(cableOfflineUpdateFilename, data))
          );
      } else {
        localStorage.setItem(cableOfflineUpdateFilename, JSON.stringify(mergeData(reset ? [] : JSON.parse(localStorage.getItem(cableOfflineUpdateFilename) || '[]'))));
      }
      retval = retval.pipe(concatMap(() => this.getCableOfflieData(nklAccount)));
    } catch(e) {
      console.error(`Error in setting data to file '${cableOfflineUpdateFilename}'.`);
    }

    return retval;
  }

  getInfoJson() {
    return this.getData<Record<string, { lastUpdatedAt: number }>>(INFO_JSON_KEY);
  }

  removeData(key: string, defaultValue: any = null) {
    let retval = of(defaultValue);
    const infoPatch = { [key]: null };

    if (this.isNative) {
      retval = from(this.fs.deleteDataFile(key))
        .pipe(map(() => defaultValue));
    } else {
      localStorage.removeItem(key);
    }

    return retval.pipe(
      concatMap((res) => {
        let updateJsonObservable: Observable<any>;
        const infoPatch = { [key]: null };

        if (this.isNative) {
          updateJsonObservable = from(this.fs.updateInfoJson(infoPatch));
        } else {
          localStorage.setItem(INFO_JSON_KEY, JSON.stringify(Object.assign({}, JSON.parse(localStorage.getItem(INFO_JSON_KEY) || '{}'), infoPatch)));
          updateJsonObservable = of(null);
        }

        return updateJsonObservable.pipe(map(() => res));
      })
    );
  }

  clearData() {
    if (this.isNative) {
      this.fs.cleanupUnknownFiles(true);
    } else {
      const prodDeployId = localStorage.getItem('prodDeployId') || '';
      localStorage.clear();
      localStorage.setItem('prodDeployId', prodDeployId);
    }
  }
}
