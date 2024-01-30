import { BaseModel } from './base.model';

export class TaskModel extends BaseModel implements Record<string, any> {
  ID!: string;

  Priority!: string;

  Type!: string;

  Details!: string;

  AssignedTo!: string;

  Status!: string;

  Notes!: string;

  OpenDate!: string;

  CloseDate!: string;

  freeTextSearch(searchTextRegexp = new RegExp('')) {
    return [this.Details || '', this.Notes].some(value => searchTextRegexp.test(value));
  }
}
