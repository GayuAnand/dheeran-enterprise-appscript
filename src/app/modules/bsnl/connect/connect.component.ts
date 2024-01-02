import { Component } from '@angular/core';

import { BaseComponent } from 'src/app/common';
import { ApiBSNLConnectService } from 'src/app/api';
import { Observable } from 'rxjs';

@Component({
  selector: 'de-bsnl-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./../../../../reusable-styles/page-component.scss', './connect.component.scss'],
})
export class BSNLConnectComponent extends BaseComponent {
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
    this.settingsService.pageTitle = this.TKey.COMMON.UTILITY;
  }

  reset() {
    this.information = null;
    this.informationType = '';
  }

  getBillView() {
    if (this.fullPhoneNumber) {
      this.information = null;
      this.processResponse(this.bsnlConnectService.getBillView(this.fullPhoneNumber), 'Bill View', this.fullPhoneNumber);
    }
  }
  
  getVLANInfo() {
    if (this.fullPhoneNumber) {
      this.information = null;
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
        this.utilService.openErrorSnackBar(`${infoFor}: ${err}`, 'Close');
      }
    });
  }
}
