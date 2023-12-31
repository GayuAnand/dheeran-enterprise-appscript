import { catchError, map, of } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';
import { ApiGSheetDataService } from '../../api';
import { SettingsService } from './settings.service';
import { environment } from 'src/environments/environment';

export const AuthGuard = () => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const apiGSheetService = inject(ApiGSheetDataService);
  const settingsService = inject(SettingsService);

  return apiGSheetService.discoveryInfo().pipe(
    map((res: any) => {
      authService.user = res.activeUser;
      settingsService.metadata = res;
      settingsService.checkAndPopulateNavigationData();

      apiGSheetService.discoveryInfo(true).subscribe({
        next: (forceCheckRes: any) => {
          authService.user = forceCheckRes.activeUser;
          settingsService.metadata = forceCheckRes;
          settingsService.checkAndPopulateNavigationData();
        },
        error: () => router.navigate(['/auth'])
      })
      return true;
    }),
    catchError(() => {
      router.navigate(['/auth']);
      return of(true);
    }),
  );
};
