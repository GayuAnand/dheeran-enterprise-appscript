import { NgZone, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

import { ApiAppScriptService, ApiGSheetDataService, ApiAuthService } from './../../../../src/app/api';
import { AuthService, EventService, FileSystemService, SettingsService } from '../services';
import { EN_MAPPING } from './../../../assets/i18n/en.mapping';

export class BaseComponent {
  TKey = EN_MAPPING;

  ngZone: NgZone = inject(NgZone);

  fb: FormBuilder = inject(FormBuilder);

  router: Router = inject(Router);

  eventService: EventService = inject(EventService);

  authService: AuthService = inject(AuthService);

  settingsService: SettingsService = inject(SettingsService);

  apiGSheetDataService: ApiGSheetDataService = inject(ApiGSheetDataService);

  fs = inject(FileSystemService);

  apiServices = {
    auth: inject(ApiAuthService),
    appScript: inject(ApiAppScriptService),
  };
}
