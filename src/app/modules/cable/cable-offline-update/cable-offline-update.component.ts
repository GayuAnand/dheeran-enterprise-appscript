import { Component, OnInit } from '@angular/core';

import { BaseComponent } from 'src/app/common';
import { CableService } from '../cable.service';

@Component({
  selector: 'de-cable-offline-update',
  templateUrl: './cable-offline-update.component.html',
  styleUrls: ['./../../../../reusable-styles/page-component.scss', './cable-offline-update.component.scss'],
})
export class CableOfflineUpdateComponent extends BaseComponent implements OnInit {
  offlineUpdateData: any[] = [];

  constructor(
    private cableService: CableService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.settingsService.pageTitle = this.TKey.COMMON.CABLE;
    this.refreshOfflineData();
    this._subscriptions.push(this.cableService.offlineDataUpdated$.subscribe(() => this.refreshOfflineData()));
  }

  refreshOfflineData() {
    this.storageService.getCableOfflieData()
      .subscribe({
        next: (data) => this.offlineUpdateData = data,
        error: (err) => this.utilService.openErrorSnackBar(`Error in getting cable offline update data. ERROR: '${err}'.`, 'Close'),
      });
  }

  syncOfflineUpdates() {
    this.cableService.syncOfflineUpdates();
  }
}
