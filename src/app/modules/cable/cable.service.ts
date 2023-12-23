import { Injectable } from '@angular/core';

import { CustomerModel } from 'src/app/models';
import { SettingsService, UtilService } from 'src/app/common';
import { ApiGSheetDataService, ApiStorageService } from 'src/app/api';
import { Subject, concatMap, from, map, mergeMap } from 'rxjs';

@Injectable()
export class CableService {
  offlineDataUpdated$ = new Subject();

  get customerIdLabel(): keyof CustomerModel {
    return this.settingsService.getCustomerCols()?.ID.label as keyof CustomerModel;
  }

  get customerSheetName(): keyof CustomerModel {
    return this.settingsService.metadata.sheetsInfo?.CUSTOMERS.label as keyof CustomerModel;
  }

  constructor(
    private utilService: UtilService,
    private settingsService: SettingsService,
    private storageService: ApiStorageService,
    private apiGSheetDataService: ApiGSheetDataService,
  ) {}

  
  saveCollectionUpdates(payload: CustomerModel, callback: (err?: any) => any) {
    this.apiGSheetDataService.saveOrUpdateRecord(
      this.customerSheetName,
      [this.customerIdLabel as string],
      payload
    )
      .subscribe({
        next: () => {
          callback();
        },
        error: (err) => {
          callback(err);
          this.utilService.openErrorSnackBar(err, 'Close');
        }
      });
  }

  saveOfflineUpdate(payload: CustomerModel) {
    this.storageService.updateCableOfflineData(payload, this.customerIdLabel)
      .subscribe({
        next: (data) => {
          this.utilService.openSnackBar(`Successfully saved '${payload?.Name}' to offline data.`, 'Close');
        },
        error: (err) => {
          this.utilService.openErrorSnackBar(`Error in saving '${payload?.Name}' to offline data. ERROR: ${err}.`, 'Close');
        }
      });
  }

  syncOfflineUpdates() {
    let offlineData: any[] = [];

    this.storageService.getCableOfflieData()
      .pipe(
        concatMap((data) => {
          offlineData = data || [];
          return from(data)
            .pipe(
              mergeMap((datum) => {
                return this.apiGSheetDataService.saveOrUpdateRecord(this.customerSheetName, [this.customerIdLabel as string], datum)
                  .pipe(
                    map((savedData) => {
                      // Remove successfully saved data from offlineData
                      const index = offlineData.findIndex((x) => x[this.customerIdLabel] === savedData[this.customerIdLabel]);
                      if (index >= 0) {
                        offlineData.splice(index, 1);
                      }
                      return savedData;
                    })
                  )
              }, 1)
            )
        }),
        concatMap((data) => {
          return this.storageService.updateCableOfflineData(offlineData, this.customerIdLabel, true)
            .pipe(map(() => {
              this.offlineDataUpdated$.next(true);
              return data;
            }));
        })
      )
      .subscribe({
        next: (data) => {
          this.utilService.openSnackBar(`Successfully synced offline updates for '${data?.Name}'.`);
        },
        error: (err) => this.utilService.openErrorSnackBar(`Error in syncing offline changes. ERROR: '${err}'.`, 'Close'),
        complete: () => {
          this.storageService.updateCableOfflineData(offlineData, this.customerIdLabel, true);
        }
      });
  }
}
