import { of } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';
import { IApps, IRoleValue } from '../interfaces';

export const RoleGuard = (app: IApps, role?: IRoleValue) => {
  return () => {
    const router = inject(Router);
    const authService = inject(AuthService);
    const success = role ? authService.hasPermission(app, role) : authService.hasAnyPermission(app);

    if (!success) {
      router.navigate(['/']);
    }
    return of(true);
  };
};
