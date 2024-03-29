import { BaseModel } from './base.model';

export class UGPatrolModel extends BaseModel implements Record<string, any> {
  ID!: string;

  By!: string;

  Date!: string;

  Location!: string;

  Route!: string;

  WorkType!: string;

  PatrolCount!: number;

  Remarks!: string;

  getPatrolDateStr() {
    return this.formatDate(this.Date);
  }

  freeTextSearch(searchTextRegexp = new RegExp('')) {
    return [this.Location || '', this.Route || '', this.WorkType || ''].some(value => searchTextRegexp.test(value));
  }
}
