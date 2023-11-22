import { NgZone, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

import { ApiAppScriptService, ApiAuthService } from './../../../../src/app/api';
import { AuthService, EventService, SettingsService } from '../services';
import { EN_MAPPING } from './../../../assets/i18n/en.mapping';

export class BaseComponent {
  TKey = EN_MAPPING;

  ngZone = inject(NgZone);

  fb = inject(FormBuilder);

  router = inject(Router);

  eventService = inject(EventService);

  authService = inject(AuthService);

  settingsService = inject(SettingsService);

  apiServices = {
    auth: inject(ApiAuthService),
    appScript: inject(ApiAppScriptService),
  };
}
