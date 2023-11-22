import { catchError, map, of } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';
import { ApiAuthService } from '../../api';
import { SettingsService } from './settings.service';

export const AuthGuard = () => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const apiAuthService = inject(ApiAuthService);
  const settingsService = inject(SettingsService);

  return apiAuthService.discoveryInfo().pipe(
    map((res) => {
      authService.user = res.activeUser;
      settingsService.metadata = res;
      return true;
    }),
    catchError(() => {
      router.navigate(['/auth']);
      return of(true);
    }),
  );
};
