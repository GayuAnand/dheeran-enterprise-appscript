import moment from 'moment';

import { BaseModel } from './base.model';

export class TaskModel extends BaseModel implements Record<string, any> {
  ID!: string;

  By!: string;

  Priority!: string;

  Type!: string;

  Title!: string;

  Details!: string;

  Status!: string;

  Notes!: string;

  AssignedTo!: string;

  OpenDate!: string;

  DoneDate!: string;

  get OpenDateStr() {
    return this.OpenDate ? this.formatDate(this.OpenDate, TaskModel.DATE_FORMAT) : '';
  }

  get DoneDateStr() {
    return this.DoneDate ? this.formatDate(this.DoneDate, TaskModel.DATE_FORMAT) : '';
  }

  private _AssignedToArr!: string[];

  get AssignedToArr() {
    return this._AssignedToArr;
  }

  set AssignedToArr(value: string[]) {
    this._AssignedToArr = value;
    this.AssignedTo = this.AssignedToArr.filter(x => !!x).join(',');
  }

  get Duration() {
    if (this.OpenDate) {
      return moment(this.OpenDate).diff(moment());
    }
    return '';
  }

  get DurationInHumanizeFormat() {
    return moment.duration(this.Duration).humanize(true);
  }

  get UiPriority() {
    return this.Priority === 'Medium' ? 'Intermediate' : this.Priority;
  }

  protected override loadFromObj(data: any): void {
    super.loadFromObj(data);
    this.AssignedToArr = (this.AssignedTo || '').split(/\s*,\s*/);
  }

  freeTextSearch(searchTextRegexp = new RegExp('')) {
    return [this.Details || '', this.Notes].some(value => searchTextRegexp.test(value));
  }

  getOpenCloseDate(d: string | number) {
    return BaseModel.formatDate(d, TaskModel.DATE_FORMAT);
  }

  isAssignedTo(username: string) {
    return this.AssignedToArr.some(u => u === username);
  }

  getAssignedUsersList() {
    return (this.AssignedTo || '')
      .split(/\s*,\s*/)
      .filter(userName => userName);
  }

  getMobileNumbersFromDetail() {
    return [
      ...((this.Details || '').match(/(\+91)?\d{10,10}/g) || []),
      ...((this.Notes || '').match(/(\+91)?\d{10,10}/g) || []),
    ];
  }

  getLocationInfoFromDetail() {
    return [
      ...((this.Details || '').match(/https:\/\/www.google.com\/maps\/place\/([\d.]+),([\d.]+)/g) || []).map(m => m.match(/(\d+.\d+)/g)),
      ...((this.Notes || '').match(/https:\/\/www.google.com\/maps\/place\/([\d.]+),([\d.]+)/g) || []).map(m => m.match(/(\d+.\d+)/g)),
    ];
  }

  getReminderText(isNew = false) {
    return `*${isNew ? 'NEW TASK:' : 'UPDATED TASK:'}*

Assignee: _${this.AssignedTo}_

Type: _${this.Type}_

Priority: _${this.Priority}_

Title: _${this.Title}_

Details: _${this.Details}_
${this.Notes ? `
_` + this.Notes + `_
` : ''}
Open Date: _${this.OpenDateStr}_
${this.DoneDateStr ? `
_` + this.DoneDateStr + `_
` : ''}`;
  }

  static DATE_FORMAT = 'DD MMM YYYY hh:mmA';
}
