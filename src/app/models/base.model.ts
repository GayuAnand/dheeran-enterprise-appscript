import moment from 'moment';

import { AuthService, SettingsService } from '../common';

export class BaseModel {
  constructor(data: any) {
    this.loadFromObj(data);
  }

  protected loadFromObj(data: any) {
    Object.keys(data || {}).forEach((k: string) => (this as any)[k] = data[k]);
  }

  formatDate(dateStr: string | number, format?: string) {
    return dateStr ? BaseModel.formatDate(dateStr, format) : '';
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

  static formatDate(dateStr: string | number, format = 'DD MMM YY'): string {
    const d = moment(dateStr);
    return d.isValid() ? d.format(format || 'DD MMM YY') : dateStr.toString();
  }

  static AuthService: AuthService;
  static SettingsService: SettingsService;
}
