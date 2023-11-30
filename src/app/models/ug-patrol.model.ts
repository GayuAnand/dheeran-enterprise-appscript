import { BaseModel } from './base.model';

export class UGPatrolModel extends BaseModel implements Record<string, any> {
  ID!: string;

  Date!: string;

  Location!: string;

  Route!: string;

  WorkType!: string;

  PatrolCount!: number;

  Remarks!: string;

  constructor(data: any) {
    super(data);
  }

  getPatrolDateStr() {
    return this.formatDate(this.Date);
  }

  freeTextSearch(searchText = '') {
    return (`${this.Location || ''} ${this.Route || ''} ${this.WorkType || ''}`).toLowerCase().indexOf(searchText.toLowerCase()) >= 0;
  }
}
