import { BaseModel } from './base.model';

export class UGWorkModel extends BaseModel implements Record<string, any> {
  ID!: string;

  By!: string;

  Type!: string;

  BreakTime!: string;

  RestoreTime!: string;

  Exchange!: string;

  DistanceFromExchange_km!: number;

  RouteName!: string;

  WorkLocation!: string;

  Trenching_m!: number;

  TestPit!: number;

  PLB_m!: number;

  CablePulling_m!: number;

  UsedCableCapacity!: string;

  Splicing_4F6F!: number;

  Splicing_12F24F!: number;

  Splicing_48F96F!: number;

  Splicing_144F!: number;

  Splicing288F!: number;

  ChamberInstalled!: string;

  OpeningOfManHoleCovers!: number;

  DewateringOfChambers!: number;

  OpeningAndClosingOfRingManHoles!: number;

  NoOfPolesInstalled!: number;

  OverheadCableUsed_m!: number;

  OverheadCableCapacity!: string;

  OverheadCableSplicing_4F6F!: number;

  OverheadCableSplicing_12F24F!: number;

  OverheadCableSplicing_48F96F!: number;

  OverheadCableSplicing_144F!: number;

  OverheadCableSplicing_288F!: number;

  Remarks!: string;

  constructor(data: Object) {
    super(data);
    // if (this.BreakTime) this.BreakTime = this.getDateObj(this.BreakTime) as any;
    // if (this.RestoreTime) this.RestoreTime = this.getDateObj(this.RestoreTime) as any;
  }

  getBreakTimeStr(): string {
    return this.formatDate(this.BreakTime, 'LLL') as string;
  }

  getRestoreTimeStr(): string {
    return this.formatDate(this.RestoreTime, 'LLL') as string;
  }

  freeTextSearch(searchTextRegexp = new RegExp('')) {
    return [this.Exchange || '', this.RouteName || '', this.WorkLocation || '', this.Remarks || ''].some(value => searchTextRegexp.test(value));
  }
}
