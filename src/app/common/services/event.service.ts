import { Observable, Subject, map, takeUntil } from 'rxjs';
import { Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Injectable()
export class EventService {
  isMobile!: Observable<boolean>;

  private destroyed = new Subject<void>();

  constructor(private observer: BreakpointObserver) {
    this.init();
  }

  private init() {
    this.isMobile = this.observer
      .observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Handset])
      .pipe(
        takeUntil(this.destroyed),
        map((res) => res.matches),
      );
  }
}
