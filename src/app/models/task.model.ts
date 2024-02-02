import { BaseModel } from './base.model';

export class TaskModel extends BaseModel implements Record<string, any> {
  ID!: string;

  By!: string;

  Priority!: string;

  Type!: string;

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

  static DATE_FORMAT = 'DD MMM YYYY hh:mmA';
}
