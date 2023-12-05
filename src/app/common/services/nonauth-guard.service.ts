import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';

import { ApiGSheetDataService } from '../../api';

export const NonauthGuard = () => {
  const router = inject(Router);
  const apiGSheetService = inject(ApiGSheetDataService);

  return apiGSheetService.discoveryInfo(true).pipe(
    map(() => {
      // If successful, then the user is authenticated. Redirect him to dashboard page.
      router.navigate(['/']);
      return false;
    }),
    catchError(() => of(true)),
  );
};
