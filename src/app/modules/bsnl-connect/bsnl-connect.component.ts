import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ApiBSNLConnectService } from 'src/app/api/bsnl-connect.service';

import { BaseComponent } from 'src/app/common';

@Component({
  selector: 'de-bsnl-connect',
  templateUrl: './bsnl-connect.component.html',
  styleUrls: ['./../../../reusable-styles/page-component.scss', './bsnl-connect.component.scss'],
})
export class BSNLConnectComponent extends BaseComponent implements OnInit {
  stdCode = '04286';

  phoneNumber = '';

  informationFor = '';

  informationType: 'Bill View' | 'VLAN Info' | '' = '';

  information: any = null;

  get fullPhoneNumber() {
    return `${this.stdCode}${this.phoneNumber}`;
  }

  constructor(private bsnlConnectService: ApiBSNLConnectService) {
    super();
  }

  ngOnInit(): void {
    this.settingsService.pageTitle = this.TKey.COMMON.BSNL_CONNECT;
  }

  getBillView() {
    if (this.fullPhoneNumber) {
      this.processResponse(this.bsnlConnectService.getBillView(this.fullPhoneNumber), 'Bill View', this.fullPhoneNumber);
    }
  }

  getVLANInfo() {
    if (this.fullPhoneNumber) {
      this.processResponse(this.bsnlConnectService.getVLANInfo(this.fullPhoneNumber), 'VLAN Info', this.fullPhoneNumber);
    }
  }

  private processResponse(call: Observable<any>, infoType: any, infoFor: string) {
    this.informationType = infoType;
    call.subscribe({
      next: (res: any) => {
        this.informationType = infoType;
        this.informationFor = infoFor;
        this.information = res;
      },
      error: (err: any) => {
        this.informationType = '';
        this.informationFor = '';
        this.information = null;
        this.utilService.openSnackBar(`${infoFor}: ${err}`, 'Close');
      }
    });
  }
}
