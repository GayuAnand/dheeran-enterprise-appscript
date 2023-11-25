import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';

import { ApiAuthService } from '../../api';

export const NonauthGuard = () => {
  const router = inject(Router);
  const apiAuthService = inject(ApiAuthService);

  return apiAuthService.discoveryInfo().pipe(
    map(() => {
      // If successful, then the user is authenticated. Redirect him to dashboard page.
      router.navigate(['/']);
      return false;
    }),
    catchError(() => of(true)),
  );
};
