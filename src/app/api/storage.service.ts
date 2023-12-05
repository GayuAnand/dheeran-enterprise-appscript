import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { Observable, concatMap, from, map, of } from 'rxjs';

import { ApiFileSystemService } from './filesystem.service';

const INFO_JSON_KEY = 'info.json';

@Injectable()
export class ApiStorageService {
  isNative = Capacitor.isNativePlatform();

  constructor(private fs: ApiFileSystemService) {}

  setData<T>(key: string, data: T): Observable<T> {
    let retval = of(data);

    try {
      if (this.isNative) {
        retval = from(this.fs.writeDataToFile<T>(key, data));
      } else {
        localStorage.setItem(key, JSON.stringify(data));
      }
      retval = retval.pipe(() => this.getData<T>(key));
    } catch(e) {}

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
