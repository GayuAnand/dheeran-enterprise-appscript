import moment from 'moment';
import { inject } from '@angular/core';

import { BaseModel } from './base.model';
import { AuthService } from '../common';

export class CustomerModel extends BaseModel implements Record<string, any> {
  ID!: string;

  Name!: string;

  Area!: string;

  Mobile!: string;

  STB!: string;

  'STB Status'!: string;

  Status!: string;

  'Connection On'!: string;

  'Own Notes'!: string;

  Notes!: string;

  Latitude!: string | number;
  
  Longitude!: string | number;

  private _monthsOrder!: (keyof CustomerModel)[];

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
    return (`${this.ID || ''} ${this.Name || ''} ${this.Mobile || ''} ${this.STB || ''} ${this['Own Notes'] || ''} ${this.Notes || ''}`).toLowerCase().indexOf(searchText.toLowerCase()) >= 0;
  }
  
  getMonthsInOrder(): (keyof CustomerModel)[] {
    if (this._monthsOrder) return this._monthsOrder;
    
    let monthsOrder = Object.keys(this).filter(x => moment(x).isValid()).map(x => moment(x).toDate().getTime());
    monthsOrder.sort();
    this._monthsOrder = monthsOrder.map(x => moment(x).format('MMMYYYY') as keyof CustomerModel);
    
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

  getCollectionDateKey(month: string): keyof CustomerModel {
    return `${month} Collection Date` as keyof CustomerModel;
  }

  getCollectionDate(month: string) {
    return (this as any)[this.getCollectionDateKey(month)];
  }

  getCollectionDateStrFormat(month: string) {
    return this.formatDate(this.getCollectionDate(month));
  }

  getSettlementDateKey(month: string): keyof CustomerModel {
    return `${month} Settlement Date` as keyof CustomerModel;
  }

  getSettlementDate(month: string) {
    return (this as any)[this.getSettlementDateKey(month)];
  }

  getSettlementDateStrFormat(month: string) {
    return this.formatDate(this.getSettlementDate(month));
  }

  getNotesKey(month: string) {
    return `${month} Notes`;
  }

  getNotes(month: string) {
    return (this as any)[this.getNotesKey(month)];
  }

  override getPayload() {
    const retval = super.getPayload();

    retval['Connection On'] = this.formatDate(this['Connection On']);
    this.getMonthsInOrder().forEach(month => {
      retval[this.getCollectionDateKey(month)] = this.formatDate(this[this.getCollectionDateKey(month)] as string);
      retval[this.getSettlementDateKey(month)] = this.formatDate(this[this.getSettlementDateKey(month)] as string);

      if (retval[month] && !retval[this.getCollectionDateKey(month)]) {
        // New collection
        retval[this.getCollectionByKey(month)] = BaseModel.AuthService.Username;
      }
    });
    return retval;
  }
}
