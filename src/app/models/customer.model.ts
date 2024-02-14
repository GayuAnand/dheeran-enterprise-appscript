import moment from 'moment';

import { BaseModel } from './base.model';

export class CustomerModel extends BaseModel implements Record<string, any> {
  ID!: string;

  Name!: string;

  Area!: string;

  Mobile!: string;

  AllowCredit!: '1' | '0';

  STB!: string;

  'STB Status'!: string;

  'STB Type'!: string | 'TACTV' | 'GTPL';

  'Bulk Payment'!: '1' | '0';

  Status!: string;

  'Connection On'!: string;

  'Own Notes'!: string;

  Notes!: string;

  Latitude!: string | number;

  Longitude!: string | number;

  Bill!: string | number;

  DraftChanges!: any;

  private _monthsOrder!: (keyof CustomerModel)[];

  monthlyBill() {
    return parseInt(this.Bill?.toString() || '200');
  }

  idNum() {
    return (this.ID || '').replace(/^cde0*/i, '');
  }

  hasDraftChanges() {
    return !!this.DraftChanges;
  }

  get(prop: string) {
    return (this as any)[prop];
  }

  getLatitudeAsNum() {
    return parseFloat(this.Latitude.toString());
  }

  getLongitudeAsNum() {
    return parseFloat(this.Longitude.toString());
  }

  hasLocationInfo() {
    return !!(this.Latitude && this.Longitude);
  }

  hasPendingPayment(month?: keyof CustomerModel) {
    return this.isLiveMonth(month, true) && this[month || this.getCurrentMonth() as keyof CustomerModel] === '';
  }

  isLiveMonth(month?: keyof CustomerModel, inclusive = false) {
    let retval = true;

    if (this['Connection On']) {
      let connectionDate = this.getMomentDate(this['Connection On']);
      if (inclusive || connectionDate.get('date') <= 16) connectionDate = connectionDate.startOf('month');
      retval = connectionDate.diff(this.getMomentDate(month as string)) <= 0;
    }
    return retval;
  }

  getCurrentMonth() {
    return moment().format('MMMYYYY');
  }

  getInfoAsText(includeLocation = false) {
    return [
      this.Name,
      this.Mobile.replace(/\n/g, ', ').trim(),
      this.Area,
      (includeLocation && this.Latitude && this.Longitude) ? `https://www.google.com/maps/place/${this.Latitude},${this.Longitude}` : ''
    ]
      .filter(x => x)
      .join(' - ');
  }

  getPendingMonths() {
    const pendingMonths = [];
    const monthsInOrder = this.getMonthsInOrder();

    for (let month of monthsInOrder) {
      if (this.hasPendingPayment(month)) {
        pendingMonths.push(month);
      } else {
        pendingMonths.length = 0;
      }

      if (month === this.getCurrentMonth()) break;
    }

    return pendingMonths;
  }

  getTotalPendingPayment() {
    return this.getPendingMonths().length * this.monthlyBill();
  }

  getReminderText() {
    const pendingMonths = this.getPendingMonths();

    return `Hello *${this.Name}*,

தங்களுடைய ${pendingMonths.map(m => '_' + m + '_').join(', ')} கேபிள் பில் நிலுவை தொகை *Rs.${pendingMonths.length * this.monthlyBill()}/-*. மேலும் விவரங்களுக்கு _https://portal.dheeranenterprise.in/cablebill/${encodeURIComponent(btoa(this.ID))}_.

A friendly reminder for your ${pendingMonths.map(m => '_' + m + '_').join(', ')} cable payment. Total *Rs.${pendingMonths.length * this.monthlyBill()}/-*. For more details, click _https://portal.dheeranenterprise.in/cablebill/${encodeURIComponent(btoa(this.ID))}_.

Customer Details:
- Name: ${this.Name || ''}
- Area: ${this.Area || ''}
- Mobile: ${this.getMobileNumbers().join(', ')}

Regards,
*_Dheeran Enterprise_*`;
  }

  qrCodeUrl() {
    return 'https://chart.googleapis.com/chart?chs=200x200&&cht=qr&chl=' + encodeURIComponent(this.upiUrl());
  }

  upiUrl() {
    return `upi://pay?pa=7204413241@paytm&pn=Dheeran Enterprise&cu=INR&tn=${this.processedPaymentNote()}`;
  }

  processedPaymentNote() {
    return this.rawPaymentNote().slice(0, 49);
  }

  rawPaymentNote() {
    return [this?.ID, (this?.Name || '').replace(/\s*/g, ''), this?.Area]
      .map((info) => info.replace(/[^a-z0-9 ]/ig, '').replace(/\s+/g, ' '))
      .filter((info) => !!info)
      .join(' ')
  }

  isActive() {
    return this.Status !== 'Inactive';
  }

  allowCredit() {
    return this.AllowCredit == '1';
  }

  noCredit() {
    return this.AllowCredit == '0';
  }

  getMobileNumbers(): string[] {
    return (this.Mobile || '').split(/\s+/);
  }

  idSearch(idNum: number | null) {
    return parseInt(((this.ID || '').match(/\d+/) || [''])[0]) == idNum;
  }

  phoneNumberSearch(searchTextRegexp = new RegExp('')) {
    return searchTextRegexp.test(this.Mobile || '');
  }

  freeTextSearch(searchTextRegexp = new RegExp('')) {
    return [this.ID || '', this.Name || '', this.Mobile || '', this.STB || '', this['Own Notes'] || '', this.Notes || ''].some(value => searchTextRegexp.test(value));
  }

  getMonthsInRange(pastMonths = 100, futureMonths = 100) {
    let monthsOrder = this.getMonthsInOrder();
    if (pastMonths >= 0 || futureMonths >= 0) {
      const currentMonth = moment().format('MMMYYYY');
      const index = monthsOrder.findIndex((m) => m === currentMonth);
      monthsOrder = monthsOrder.slice(index - pastMonths, index + futureMonths);
    }
    return monthsOrder;
  }

  getMonthsInOrder(): (keyof CustomerModel)[] {
    if (this._monthsOrder) return this._monthsOrder;

    let monthsOrder = Object.keys(this)
      .filter(x => {
        const momentObj = moment(x, 'MMMYYYY');
        return momentObj.isValid() && momentObj.format('MMMYYYY') === x;
      })
      .map(x => moment(x, 'MMMYYYY').toDate().getTime());
    monthsOrder.sort();
    this._monthsOrder = monthsOrder.map(x => moment(x).format('MMMYYYY') as keyof CustomerModel);

    return this._monthsOrder;
  }

  getCollectionAgents(): Record<string, boolean> {
    return this.getMonthsInOrder()
      .map((month) => this.getCollectionBy(month))
      .filter((agent) => agent)
      .reduce((acc, agent) => {
        acc[agent] = true;
        return acc;
      }, {});
  }

  getCollectionInfoByAgent(infoType: 'month' | 'collectionDate' = 'month'): Record<string, Record<string, number>> {
    const retval: any = {};

    this.getMonthsInOrder()
      .forEach((month) => {
        let infoTypeMonth: string = month;
        const collection = this[month];
        const agent = this.getCollectionBy(month);

        if (collection && agent) {
          if (infoType === 'collectionDate') {
            infoTypeMonth = this.formatDate(this.getCollectionDate(month), 'MMMYYYY') as string;
          }

          retval[agent] = retval[agent] || {};
          retval[agent][infoTypeMonth] = retval[agent][infoTypeMonth] || 0;
          retval[agent][infoTypeMonth] += parseInt(collection.toString());
        }
      });
    return retval;
  }

  getPendingSettlementMonths(agents: string[] = []): Record<keyof CustomerModel, boolean> {
    return this.getMonthsInOrder()
      .filter((month) => this[month] &&
        this.getCollectionDate(month) &&
        !this.getSettlementDate(month) &&
        (!agents.length || agents.some((agent => this.getCollectionBy(month) === agent))))
      .reduce((acc, month) => {
        acc[month] = true;
        return acc;
      }, {} as Record<keyof CustomerModel, boolean>);
  }

  getPendingSettlement(withCurrency = false, agents: string[] = []): number | string {
    const pendingSettlement = Object.keys(this.getPendingSettlementMonths(agents))
      .reduce((acc, month) => {
        acc += parseInt((this as any)[month] as string || '0') || 0;
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
