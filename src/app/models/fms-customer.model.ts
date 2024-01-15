import moment from 'moment';

import { BaseModel } from './base.model';

export class FMSCustomerModel extends BaseModel implements Record<string, any> {
  PHONE_NO!: string;
  
  OLT_IP!: string;
  
  MTCE_FRANCHISE_CODE!: string;
  
  CATEGORY!: string;
  
  CUSTOMER_NAME!: string;
  
  MOBILE_NO!: string;
  
  EMAIL_ID!: string;
  
  BB_USER_ID!: string;
  
  FTTH_EXCHANGE!: string;
  
  PLAN_ID!: string;
  
  BB_PLAN!: string;
  
  LL_INSTALL_DATE!: string;
  
  WKG_STATUS!: string;
  
  ASSIGNED_TO!: string;
  
  RURAL_URBAN!: string;
  
  ACQUISITION_TYPE!: string;

  freeTextSearch(searchTextRegexp = new RegExp('')) {
    return [this.PHONE_NO || '', this.OLT_IP || '', this.MOBILE_NO || '', this.EMAIL_ID || '', this.CUSTOMER_NAME || ''].some(value => searchTextRegexp.test(value));
  }

  getPhoneNumber() {
    return this.PHONE_NO.replace(/[^0-9]/g, '');
  }

  getInfoAsText() {
    return [
      `Name: ${this.CUSTOMER_NAME}`,
      `Phone: ${this.PHONE_NO}`,
      `BB UserID: ${this.BB_USER_ID}`,
      `Mobile: ${this.MOBILE_NO}`,
      `Email: ${this.EMAIL_ID}`,
      `Franchise: ${this.MTCE_FRANCHISE_CODE}`,
    ]
      .join('\n');
  }
}
