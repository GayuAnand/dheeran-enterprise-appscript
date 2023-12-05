import { Injectable } from '@angular/core';
import { Observable, Subject, map, takeUntil, timer } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { UtilService } from './util.service';

export interface ITimeDiffObservable {
  destroy: () => void,
  observable: Observable<{ duration: number, text: string }>
}

@Injectable()
export class EventService {
  isMobile!: Observable<boolean>;

  constructor(
    private observer: BreakpointObserver,
    private utilService: UtilService,
  ) {
    this.init();
  }

  getTimeDifferenceObservable(startTime: Date | number, duration = 15000): ITimeDiffObservable {
    const until = new Subject();
    const destroy = () => {
      until.next(null);
      until.complete();
    };
    const observable = timer(0, duration)
      .pipe(
        takeUntil(until),
        map(() => this.utilService.getReadableTimeDifference(startTime))
      );

    return { destroy, observable };
  }

  private init() {
    this.isMobile = this.observer
      .observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Handset])
      .pipe(map((res) => res.matches));
  }
}
