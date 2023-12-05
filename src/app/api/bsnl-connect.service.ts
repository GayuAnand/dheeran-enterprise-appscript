import { Injectable } from '@angular/core';

import { ApiAuthService } from './auth.service';
import { ApiAppScriptService } from './appscript.service';

@Injectable()
export class ApiBSNLConnectService {
  constructor(
    private apiAppScriptService: ApiAppScriptService,
    private apiAuthService: ApiAuthService,
  ) {}

  /**
   * @param phonenumber Format 04286-225678 or 04286225678
   */
  getBillView(phonenumber: string) {
    return this.apiAppScriptService.exec<{
      DUE_DATE: string;
      CIRCLE_CODE: string;
      SSA_CODE: string,
      BILL_STATUS: string,
      SVC_TYPE: string,
      ZONE_CODE: string,
      PHONE_NO: string,
      INVOICE_NO: string,
      ACCT_TYPE: string,
      INVOICE_DATE: string,
      STATUS: string,
      CUSTOMER_NAME: string,
      LATEST_INVOICE: string,
      DUE_IN_DAYS: number,
      ACCOUNT_NO: string,
      TOTAL_AMOUNT: number
    }>('getBillView', [phonenumber, this.apiAuthService.authToken]);
  }

  /**
   * @param phonenumber Format 04286-225678 or 04286225678
   */
  getVLANInfo(phonenumber: string) {
    return this.apiAppScriptService.exec<any>('getVLANInfo', [phonenumber, this.apiAuthService.authToken]);
  }
}
