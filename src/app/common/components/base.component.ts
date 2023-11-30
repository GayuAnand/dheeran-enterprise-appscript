import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { FormBuilder, FormControl } from '@angular/forms';
import { Component, NgZone, OnDestroy, inject } from '@angular/core';

import { EN_MAPPING } from './../../../assets/i18n/en.mapping';
import { ApiAppScriptService, ApiGSheetDataService, ApiAuthService, ApiFileSystemService } from './../../../../src/app/api';
import { AuthService, EventService, SettingsService, UtilService } from '../services';

@Component({
  selector: 'de-base-component',
  template: ``,
})
export class BaseComponent implements OnDestroy {
  TKey = EN_MAPPING;

  ngZone: NgZone = inject(NgZone);

  fb: FormBuilder = inject(FormBuilder);

  router: Router = inject(Router);

  eventService: EventService = inject(EventService);

  authService: AuthService = inject(AuthService);

  settingsService: SettingsService = inject(SettingsService);

  utilService: UtilService = inject(UtilService);

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
