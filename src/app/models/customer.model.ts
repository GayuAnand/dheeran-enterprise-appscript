import { BaseModel } from './base.model';

export class CustomerModel extends BaseModel {
  Name!: string;

  Area!: string;

  Mobile!: string;

  STB!: string;

  Status!: string;

  'Own Notes'!: string;

  Notes!: string;

  isActive() {
    return this.Status !== 'Inactive';
  }
}
