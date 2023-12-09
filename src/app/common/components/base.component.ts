import { Subscription, map } from 'rxjs';
import { Router } from '@angular/router';
import { FormBuilder, FormControl } from '@angular/forms';
import { Component, NgZone, OnDestroy, inject } from '@angular/core';

import { EN_MAPPING } from './../../../assets/i18n/en.mapping';
import { IApps, IRoleValue } from '../interfaces';
import { AuthService, EventService, GeoLocationService, SettingsService, UtilService } from '../services';
import { ApiAppScriptService, ApiGSheetDataService, ApiAuthService, ApiFileSystemService, ApiStorageService } from './../../../../src/app/api';

@Component({
  selector: 'de-base-component',
  template: ``,
})
export class BaseComponent implements OnDestroy {
  TKey = EN_MAPPING;

  METADATA = {
    APPS: IApps,
    ROLES: IRoleValue,
  };

  ngZone: NgZone = inject(NgZone);

  fb: FormBuilder = inject(FormBuilder);

  router: Router = inject(Router);

  eventService: EventService = inject(EventService);

  authService: AuthService = inject(AuthService);

  storageService: ApiStorageService = inject(ApiStorageService);

  settingsService: SettingsService = inject(SettingsService);

  utilService: UtilService = inject(UtilService);

  geolocationService: GeoLocationService = inject(GeoLocationService);

  apiGSheetDataService: ApiGSheetDataService = inject(ApiGSheetDataService);

  fs = inject(ApiFileSystemService);

  apiServices = {
    auth: inject(ApiAuthService),
    appScript: inject(ApiAppScriptService),
  };

  _subscriptions: Subscription[] = [];

  ngOnDestroy(): void {
    this._subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  getRefreshCacheInfo(filename: string, cacheInfo: any) {
    return this.storageService.getInfoJson()
      .pipe(
        map((infoJson) => {
          const info = infoJson?.[filename];

          if (info?.lastUpdatedAt) {
            cacheInfo?.destroy();
            cacheInfo = this.eventService.getTimeDifferenceObservable(info?.lastUpdatedAt);
          }
          return cacheInfo;
        })
      );
  };

  getNewFilterControl(defaultValue: string[] = [], options: string[] = []) {
    const self = this;

    return {
      control: new FormControl<string[]>(defaultValue),
      controlOptions: options,
      selectAll: false,
      _selectedObj: {},
      toggleSelectAll() {
        this.control.setValue(this.selectAll ? this.controlOptions.slice() : []);
        self.onFilterChange();
      },
      onSelectionChange() {
        this.selectAll = this.control.value?.length === this.controlOptions?.length;
        self.onFilterChange();
      }
    } as {
      control: FormControl<string[]>,
      controlOptions: string[],
      selectAll: boolean,
      _selectedObj: Record<string, boolean>,
      toggleSelectAll: () => void,
      onSelectionChange: () => void,
    };
  }

  onFilterChange() {}
}
