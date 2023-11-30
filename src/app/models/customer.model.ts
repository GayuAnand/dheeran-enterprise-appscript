import moment from 'moment';

import { BaseModel } from './base.model';

export class CustomerModel extends BaseModel implements Record<string, any> {
  Name!: string;

  Area!: string;

  Mobile!: string;

  STB!: string;

  Status!: string;

  'Connection On'!: string;

  'Own Notes'!: string;

  Notes!: string;

  private _monthsOrder!: string[];

  get(prop: string) {
    return (this as any)[prop];
  }

  isActive() {
    return this.Status !== 'Inactive';
  }

  getMobileNumbers(): string[] {
    return (this.Mobile || '').split(/\s+/);
  }

  freeTextSearch(searchText = '') {
    return (`${this.Name || ''} ${this.Mobile || ''} ${this.STB || ''} ${this['Own Notes'] || ''} ${this.Notes || ''}`).toLowerCase().indexOf(searchText.toLowerCase()) >= 0;
  }

  getMonthsInOrder() {
    if (this._monthsOrder) return this._monthsOrder;

    let monthsOrder = Object.keys(this).filter(x => moment(x).isValid()).map(x => moment(x).toDate().getTime());
    monthsOrder.sort();
    this._monthsOrder = monthsOrder.map(x => moment(x).format('MMMYYYY'));

    return this._monthsOrder;
  }

  getPendingSettlement(withCurrency = false): number | string {
    const pendingSettlement = this.getMonthsInOrder()
      .filter((month) => this[month as keyof CustomerModel] && this.getCollectionDate(month) && !this.getSettlementDate(month))
      .reduce((acc, month) => {
        acc += parseInt(this[month as keyof CustomerModel] as string || '0') || 0;
        return acc;
      }, 0);

    return withCurrency ? `Rs.${pendingSettlement}/-` : pendingSettlement;
  }

  getConnectionDate(format = true) {
    return this.formatDate(this['Connection On'] || '');
  }
  
  getCollectionDate(month: string) {
    return this.formatDate((this as any)[`${month} Collection Date`]);
  }

  getSettlementDate(month: string) {
    return this.formatDate((this as any)[`${month} Settlement Date`]);
  }

  getNotes(month: string) {
    return (this as any)[`${month} Notes`];
  }
}
