import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { Observable, delay, map, of } from 'rxjs';

import { ApiAuthService } from './auth.service';
import { BaseModel, CustomerModel } from '../models';
import { ApiAppScriptService } from './appscript.service';
import { ApiFileSystemService } from './filesystem.service';

@Injectable()
export class ApiGSheetDataService {
  constructor(
    private appScriptService: ApiAppScriptService,
    private apiAuthService: ApiAuthService,
    private fs: ApiFileSystemService,
  ) {}

  getSheetData<T extends BaseModel>(sheetName: string, model: new (data: any) => T, force = false): Observable<T[]> {
    if (!force && localStorage.getItem(sheetName)) {
      return of(JSON.parse(localStorage.getItem(sheetName) || '')).pipe(delay(1), map(data => this.transformDataToObj(data, model)));
    }

    return this.appScriptService.exec<{ data: T[], headers: string[] }>('getSheetData', [sheetName, this.apiAuthService.getAuthToken()])
      .pipe(
        map((data) => {
          localStorage.setItem(sheetName, JSON.stringify(data));
          return data;
        }),
        map(data => this.transformDataToObj(data, model))
      );
  }

  saveOrUpdateRecord<T extends BaseModel>(sheetName: string, idColumns: string[], data: T): Observable<T> {
    return this.appScriptService.exec<T>('saveOrUpdateRecordById', [sheetName, idColumns, data, this.apiAuthService.getAuthToken()])
      .pipe(
        map((res) => {
          const constructor = Object.getPrototypeOf(data).constructor;
          return new constructor(res);
        })
      );
  }

  deleteRecord<T extends BaseModel>(sheetName: string, idColumns: string[], data: T): Observable<boolean> {
    return this.appScriptService.exec<boolean>('deleteRecord', [sheetName, idColumns, data, this.apiAuthService.getAuthToken()]);
  }

  private transformDataToObj<T extends BaseModel>(data: { data: T[], headers: string[] }, modelCls: new (args: any) => T): T[] {
    const dataToObj = (d: any) => {
      const retval: any = {};
      data.headers.forEach((h, i) => retval[h] = d[i]);
      return retval;
    };

    return data.data.map(d => {
      const o = (new modelCls(dataToObj(d)));
      return o;
    });
  }
}
