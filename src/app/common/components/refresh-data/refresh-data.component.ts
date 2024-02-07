import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

import { BaseComponent } from '../base.component';
import { ITimeDiffObservable } from '../../services';

@Component({
  selector: 'de-refresh-data',
  templateUrl: './refresh-data.component.html',
  styleUrls: ['./refresh-data.component.scss']
})
export class RefreshDataComponent extends BaseComponent implements OnChanges {
  @Input() cacheInfo!: ITimeDiffObservable | null;

  /**
   * In minutes.
   * Default: 4hrs (60 * 4)
   */
  @Input() refreshTriggerInterval = 240;

  @Output() refresh = new EventEmitter<void>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.cacheInfo) {
      this.cacheInfo?.observable.subscribe((info) => {
        if (this.settingsService.isOnline && info.duration > this.refreshTriggerInterval) {
          // If online and cache duration is greater than refreshTriggerInterval, trigger refresh.
          this.refresh.emit();
        }
      })
    }
  }
}
