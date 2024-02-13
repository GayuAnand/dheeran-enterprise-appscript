import { Network } from '@capacitor/network';
import { Injectable } from '@angular/core';
import { Observable, concatMap, delay, map, of, throwError } from 'rxjs';

import { BaseModel, CustomerModel } from '../models';
import { ApiAuthService } from './auth.service';
import { ApiStorageService } from './storage.service';
import { ApiAppScriptService } from './appscript.service';
import { IMetadata, IUser } from '../common/interfaces';

export interface IGsheetData<T extends BaseModel> {
  data: T[],
  headers: string[]
};

@Injectable()
export class ApiGSheetDataService {
  isOnline = true;

  constructor(
    private appScriptService: ApiAppScriptService,
    private apiAuthService: ApiAuthService,
    private storageService: ApiStorageService,
  ) {
    Network.getStatus().then((connectionStatus) => this.isOnline = connectionStatus.connected);
    Network.addListener('networkStatusChange', (status) => this.isOnline = status.connected);
  }

  getSheetData<T extends BaseModel>(sheetName: string, model: new (data: any) => T, force = false): Observable<T[]> {
    return this.checkCacheAndGet<IGsheetData<T>>('getSheetData', `SHEET_${sheetName}`, [sheetName, this.apiAuthService.authToken], force)
      .pipe(
        map(data => this.transformDataToObj(data, model))
      );
  }

  getCableCustomerDetails(customerId: string) {
    return this.appScriptService.exec<CustomerModel>('getCableCustomerDetails', [customerId])
      .pipe(
        map((res) => (new CustomerModel(res)))
      );
  }

  discoveryInfo(force = false): Observable<IMetadata & { activeUser: IUser } | null> {
    return this.storageService.getData<string>(this.apiAuthService.authTokenName)
      .pipe(
        map((token) => this.apiAuthService.authToken = token),
        concatMap(() => this.storageService.getData<string>('prodDeployId')
          .pipe(
            map((prodDeployId) => this.appScriptService.prodDeployId = prodDeployId || this.appScriptService.prodDeployId),
          )),
        concatMap(() => this.checkCacheAndGet<IMetadata & { activeUser: IUser }>('discoveryInfo', 'discoveryInfo', [this.apiAuthService.authToken], force)),
        concatMap((res) => {
          let refreshDiscovery = of(res);
          const prodDeployId = res?.deployIds?.[0] || this.appScriptService.prodDeployId;
          if (prodDeployId !== this.appScriptService.prodDeployId) {
            this.appScriptService.prodDeployId = prodDeployId;
            refreshDiscovery = this.checkCacheAndGet<IMetadata & { activeUser: IUser }>('discoveryInfo', 'discoveryInfo', [this.apiAuthService.authToken], force);
          }

          return this.storageService.setData('prodDeployId', this.appScriptService.prodDeployId)
            .pipe(concatMap(() => refreshDiscovery));
        })
      );
  }

  checkCacheAndGet<T>(functionName: string, cacheKey: string, parameters: any[], force = false): Observable<T> {
    let cacheObservable: Observable<T> = of(null as any);

    if (!force || !this.isOnline) {
      cacheObservable = this.storageService.getData<T>(cacheKey).pipe(delay(1));
    }

    return cacheObservable
      .pipe(
        concatMap((res) =>{
          if (res) return of(res);

          return this.appScriptService.exec<T>(functionName, parameters)
            .pipe(
              concatMap((data) => this.storageService.setData(cacheKey, data)),
            );
        })
      );
  }

  saveOrUpdateRecord<T extends BaseModel>(sheetName: string, idColumns: string[], data: T): Observable<T> {
    return this.appScriptService.exec<T>('saveOrUpdateRecordById', [sheetName, idColumns, data, this.apiAuthService.authToken])
      .pipe(
        map((res) => {
          const constructor = Object.getPrototypeOf(data).constructor;
          return new constructor(res);
        })
      );
  }

  deleteRecord<T extends BaseModel>(sheetName: string, idColumns: string[], data: T): Observable<boolean> {
    return this.appScriptService.exec<boolean>('deleteRecord', [sheetName, idColumns, data, this.apiAuthService.authToken]);
  }

  private transformDataToObj<T extends BaseModel>(data: IGsheetData<T> , modelCls: new (args: any) => T): T[] {
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
