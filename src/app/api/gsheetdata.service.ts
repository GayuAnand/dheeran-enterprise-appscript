import { Observable, map } from 'rxjs';
import { Injectable } from '@angular/core';

import { ApiAuthService } from './auth.service';
import { BaseModel, CustomerModel } from '../models';
import { ApiAppScriptService } from './appscript.service';

@Injectable()
export class ApiGSheetDataService {
  constructor(private appScriptService: ApiAppScriptService, private apiAuthService: ApiAuthService) {}

  getSheetData(sheetName: string): Observable<CustomerModel[]> {
    return this.appScriptService.exec('getSheetData', [sheetName, localStorage.getItem(this.apiAuthService.authTokenName)])
      .pipe(map(data => this.transformDataToObj(data, CustomerModel)));
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
