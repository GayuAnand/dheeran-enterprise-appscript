import { Injectable } from '@angular/core';

import { IApps, IRoleValue, IUser } from '../interfaces';

@Injectable()
export class AuthService {
  user?: IUser;

  isAdmin() {
    return !!this.user?.Role?.[IApps.ADMIN];
  }

  hasPermission(app: IApps, value: IRoleValue) {
    return this.isAdmin() || (this.user?.Role?.[app] === value);
  }

  hasAnyPermission(app: IApps) {
    return this.isAdmin() || !!this.user?.Role?.[app];
  }
}
