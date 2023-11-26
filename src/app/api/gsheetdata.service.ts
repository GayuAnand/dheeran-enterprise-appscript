import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { Observable, delay, map, of } from 'rxjs';

import { ApiAuthService } from './auth.service';
import { BaseModel, CustomerModel } from '../models';
import { ApiAppScriptService } from './appscript.service';
import { FileSystemService } from './filesystem.service';

@Injectable()
export class ApiGSheetDataService {
  constructor(
    private appScriptService: ApiAppScriptService,
    private apiAuthService: ApiAuthService,
    private fs: FileSystemService,
  ) {}

  getSheetData(sheetName: string, force = false): Observable<CustomerModel[]> {
    if (!force && localStorage.getItem(sheetName)) {
      return of(JSON.parse(localStorage.getItem(sheetName) || '')).pipe(delay(1), map(data => this.transformDataToObj(data, CustomerModel)));
    }

    return this.appScriptService.exec('getSheetData', [sheetName, localStorage.getItem(this.apiAuthService.authTokenName)])
      .pipe(
        map(data => {
          localStorage.setItem(sheetName, JSON.stringify(data));
          return data;
        }),
        map(data => this.transformDataToObj(data, CustomerModel))
      );
  }

  private transformDataToObj<T extends BaseModel>(data: { data: any[], headers: string[] }, modelCls: new (args: any) => T): T[] {
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
