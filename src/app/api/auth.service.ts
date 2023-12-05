import { concatMap } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { ApiStorageService } from './storage.service';
import { ApiAppScriptService } from './appscript.service';

@Injectable()
export class ApiAuthService {
  authTokenName = 'x-auth-token';

  authToken = '';

  constructor(
    private apiAppScriptService: ApiAppScriptService,
    private storageService: ApiStorageService,
    private router: Router,
  ) {
    (window as any).ApiAuthService = this;
  }

  signIn(username: string, password: string) {
    return this.apiAppScriptService.exec<string>('login', [username, password])
      .pipe(
        concatMap((token) => {
          this.authToken = token;
          if (token) {
            return this.storageService.setData(this.authTokenName, token);
          }
          return this.storageService.removeData(this.authTokenName, token);
        })
      );
  }

  signOut() {
    return this.storageService.removeData(this.authTokenName)
      .subscribe(() => {
        this.storageService.clearData();
        this.router.navigate(['/auth']);
      });
  }
}
