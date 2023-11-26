import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map, of } from 'rxjs';

import { IMetadata, IUser } from '../common/interfaces';
import { ApiAppScriptService } from './appscript.service';

@Injectable()
export class ApiAuthService {
  authTokenName = 'x-auth-token';

  constructor(private apiAppScriptService: ApiAppScriptService, private router: Router) {
    (window as any).ApiAuthService = this;
  }

  signOut() {
    localStorage.removeItem(this.authTokenName);
    localStorage.clear();
    this.router.navigate(['/auth']);
  }

  discoveryInfo(): Observable<IMetadata & { activeUser: IUser }> {
    // return of({ activeUser: { Username: 'Anand' }});
    return this.apiAppScriptService.exec('discoveryInfo', [localStorage.getItem(this.authTokenName)])
      .pipe(
        map((res) => {
          this.apiAppScriptService.prodDeployId = res?.deployIds?.[0] || this.apiAppScriptService.prodDeployId;
          return res;
        })
      );
  }

  signIn(username: string, password: string) {
    return this.apiAppScriptService.exec('login', [username, password])
      .pipe(
        map((token) => {
          if (token) {
            localStorage.setItem(this.authTokenName, token);
          } else {
            localStorage.removeItem(this.authTokenName);
          }
          return token;
        })
      );
  }
}
