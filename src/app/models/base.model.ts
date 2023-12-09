import moment from 'moment';

import { AuthService } from '../common';

export class BaseModel {
  constructor(data: any) {
    Object.keys(data || {}).forEach((k: string) => (this as any)[k] = data[k]);
  }

  formatDate(dateStr: string | number) {
    return dateStr ? BaseModel.formatDate(dateStr) : '';
  }

  getMomentDate(dateStr: string) {
    return moment(dateStr);
  }

  getDateObj(dateStr: string) {
    return this.getMomentDate(dateStr).toDate();
  }

  clone(): typeof this {
    return new (Object.getPrototypeOf(this).constructor)(JSON.parse(JSON.stringify(this)));
  }

  getPayload() {
    return JSON.parse(JSON.stringify(this));
  }

  static formatDate(dateStr: string | number) {
    const d = moment(dateStr);
    return d.isValid() ? d.format("DD MMM YY") : dateStr;
  }

  static AuthService: AuthService;
}
