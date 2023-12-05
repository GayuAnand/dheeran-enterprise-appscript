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

  getCollectionAgents() {
    return this.getMonthsInOrder()
      .map((month) => this.getCollectionBy(month))
      .filter((agent) => agent)
      .reduce((acc, agent) => {
        acc[agent] = true;
        return acc;
      }, {});
  }

  getPendingSettlement(withCurrency = false, agents: string[] = []): number | string {
    const pendingSettlement = this.getMonthsInOrder()
      .filter((month) => this[month as keyof CustomerModel] &&
        this.getCollectionDate(month) &&
        !this.getSettlementDate(month) &&
        (!agents.length || agents.some((agent => this.getCollectionBy(month) === agent))))
      .reduce((acc, month) => {
        acc += parseInt(this[month as keyof CustomerModel] as string || '0') || 0;
        return acc;
      }, 0);

    return withCurrency ? `Rs.${pendingSettlement}/-` : pendingSettlement;
  }

  getConnectionDate() {
    return this.formatDate(this['Connection On'] || '');
  }

  getCollectionByKey(month: string) {
    return `${month} Collection By`;
  }

  getCollectionBy(month: string) {
    return (this as any)[`${month} Collection By`];
  }

  getSettlementToKey(month: string) {
    return `${month} Settlement To`;
  }

  getSettlementTo(month: string) {
    return (this as any)[`${month} Settlement To`];
  }

  getCollectionDateKey(month: string) {
    return `${month} Collection Date`;
  }

  getCollectionDate(month: string) {
    return (this as any)[this.getCollectionDateKey(month)];
  }

  getCollectionDateStrFormat(month: string) {
    return this.formatDate(this.getCollectionDate(month));
  }

  getSettlementDateKey(month: string) {
    return `${month} Settlement Date`;
  }

  getSettlementDate(month: string) {
    return (this as any)[this.getSettlementDateKey(month)];
  }

  getSettlementDateStrFormat(month: string) {
    return this.formatDate(this.getSettlementDate(month));
  }

  getNotes(month: string) {
    return (this as any)[`${month} Notes`];
  }
}
