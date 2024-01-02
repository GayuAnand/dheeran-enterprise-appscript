import { Component, OnInit } from '@angular/core';
import { concatMap, map } from 'rxjs';

import { BaseComponent } from 'src/app/common';
import { FMSCustomerModel } from 'src/app/models';

@Component({
  selector: 'de-bsnl-refresh-fms-details',
  templateUrl: './bsnl-refresh-fms-details.component.html',
  styleUrls: ['./../../../../reusable-styles/page-component.scss', './bsnl-refresh-fms-details.component.scss']
})
export class BSNLRefreshFMSDetailsComponent extends BaseComponent implements OnInit {
  fullData: FMSCustomerModel[] = [];

  fullDataObj: Record<string, FMSCustomerModel> = {};
  
  cacheInfo: any = null;
  
  rawAccountsText: string[] = [];
  
  processedAccountsCsvValues: any[] = [];

  processedAccountsObj: Record<string, FMSCustomerModel> = {};

  diffRecords: Record<string, any> | any = {};

  diffRecordsArr: any[] = [];

  ngOnInit(): void {
    this.refreshData();
    console.log(this);
  }

  refreshData(force = false) {
    this.settingsService.processingText = `Refreshing data...`;
    this.apiGSheetDataService.getSheetData<FMSCustomerModel>(this.settingsService.metadata.sheetsInfo?.FMS_EXPORT.label as string, FMSCustomerModel, force)
      .pipe(
        concatMap((res) => this.getRefreshCacheInfo(`SHEET_${this.settingsService.metadata.sheetsInfo?.FMS_EXPORT.label}` as string, this.cacheInfo)
          .pipe(
            map((value) => {
              this.cacheInfo = value;
              return res;
            }))
          )
      )
      .subscribe({
        next: (data) => {
          this.settingsService.processingText = '';
          this.fullData = data;
          this.fullData.forEach((d) => this.fullDataObj[d.PHONE_NO] = d);
        },
        error: () => this.settingsService.processingText = ''
      });
  }

  downloadAccounts() {
    window.open('https://fms.bsnl.in/downloadAccountsList?userName=pradeep_tnslm&serviceType=Bharat%20Fiber%20BB', '_blank');
    window.open('https://fms.bsnl.in/downloadAccountsList?userName=yogapradeep_tnslm&serviceType=Bharat%20Fiber%20BB', '_blank');
    window.open('https://fms.bsnl.in/downloadAccountsList?userName=krbdheeran_tnslm&serviceType=Bharat%20Fiber%20BB', '_blank');
    window.open('https://fms.bsnl.in/downloadAccountsList?userName=krbsuresh_tnslm&serviceType=Bharat%20Fiber%20BB', '_blank');
  }

  processAccounts(event: any, mergeAndDownload = false) {
    this.diffRecords = {};
    this.rawAccountsText = [];
    this.processedAccountsCsvValues = [];
    this.processedAccountsObj = {};

    const files = event.target.files as FileList;

    Array.from(files).forEach(f => {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.rawAccountsText.push(e.target.result as string);

        if (files.length === this.rawAccountsText.length) {
          this.rawAccountsText.forEach((rat) => {
            const dom = (new DOMParser()).parseFromString(rat, 'text/html');
            const arrayValues: string[][] = Array.from(dom.querySelectorAll('table')[0].querySelectorAll('tr')).map(tr => Array.from(tr.querySelectorAll('th,td')).map((td) => (td as HTMLElement).innerText));
            const headers: any[] = arrayValues.shift() as any[];
            arrayValues.forEach(row => {
              const accountObj: any = new FMSCustomerModel({});
              row.forEach((d, i) => accountObj[headers[i]] = d);
              this.processedAccountsCsvValues.push(accountObj);
              this.processedAccountsObj[accountObj.PHONE_NO] = accountObj;
            });
          });

          if (mergeAndDownload) {
            this.utilService.exportObjectsToCSV(this.processedAccountsCsvValues, 'Master BSNL Accounts');
          }

          this.fullData
            .filter(d => this.processedAccountsObj[d.PHONE_NO])
            .forEach(d => {
              const diffKeys = this.diffKeys(d, this.processedAccountsObj[d.PHONE_NO]);
              if (diffKeys.length) {
                this.diffRecords[d.PHONE_NO] = {
                  database: d,
                  fms: this.processedAccountsObj[d.PHONE_NO],
                  diffKeys
                };
              }
            });
          this.processedAccountsCsvValues
            .filter(d => this.fullData[d.PHONE_NO])
            .forEach(d => {
              const diffKeys = this.diffKeys(d, this.fullData[d.PHONE_NO]);
              if (diffKeys.length) {
                this.diffRecords[d.PHONE_NO] = {
                  database: this.fullData[d.PHONE_NO],
                  fms: d,
                  diffKeys
                };
              }
            });
          
          this.diffRecordsArr = Object.values(this.diffRecords);
          console.log(this.diffRecords);
        }
      };
      reader.readAsText(f);
    });
  }

  diffKeys(r1: Record<string, any>, r2: Record<string, any>) {
    const keysToIgnore: any = {
      ASSIGNED_TO: true,
      LL_INSTALL_DATE: true,
    };

    const retval: Record<string, boolean> = {};

    function getDiffKeys(_r1: Record<string, any>, _r2: Record<string, any>) {
      return Object.keys(_r1)
        .filter(k => !keysToIgnore[k])
        .filter((k1: string) => (_r1[k1] || '').toString().trim() != (_r2[k1] || '').toString().trim())
        .forEach(k => retval[k] = true);
    }

    getDiffKeys(r1, r2);
    getDiffKeys(r2, r1);

    return Object.keys(retval);
  }
}
