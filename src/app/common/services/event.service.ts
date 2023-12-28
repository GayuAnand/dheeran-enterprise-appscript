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
  ) {
    this.init();
  }

  /**
   * @param startTime Starting time from which the lapsed time duration is calculated
   * @param duration in ms to update the timer
   * @returns 
   */
  getTimeDifferenceObservable(startTime: Date | number, duration = 15000): ITimeDiffObservable {
    const until = new Subject();
    const destroy = () => {
      until.next(null);
      until.complete();
    };
    const observable = timer(0, duration)
      .pipe(
        takeUntil(until),
        map(() => this.getReadableTimeDifference(startTime))
      );

    return { destroy, observable };
  }

  getReadableTimeDifference(pastDate: Date | number) {
    pastDate = (typeof pastDate === 'number') ? (new Date(pastDate)) : pastDate;
    const currentDate = new Date();
    const timeDifference = currentDate.getTime() - pastDate.getTime();
    
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    const retval = { duration: minutes, text: '' };
  
    if (seconds < 5) {
      retval.text = 'Just now';
    } else if (seconds < 60) {
      retval.text = `${seconds} seconds ago`;
    } else if (minutes === 1) {
      retval.text = `1 minute ago`;
    } else if (minutes < 60) {
      retval.text = `${minutes} minutes ago`;
    } else if (hours === 1) {
      retval.text = `1 hour ago`;
    } else if (hours < 24) {
      retval.text = `${hours} hours ago`;
    } else if (days === 1) {
      retval.text = `1 day ago`;
    } else {
      retval.text = `${days} days ago`;
    }

    return retval;
  }

  private init() {
    this.isMobile = this.observer
      .observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Handset])
      .pipe(map((res) => res.matches));
  }
}
