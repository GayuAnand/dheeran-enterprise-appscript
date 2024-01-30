import { Injectable } from '@angular/core';

import { IApps, IRoleValue, IUser } from '../interfaces';

@Injectable()
export class AuthService {
  user?: IUser;

  get Username() {
    return this.user?.Username || '';
  }

  isAdmin() {
    return !!this.user?.Role?.[IApps.ADMIN];
  }

  hasPermission(app: IApps, value: IRoleValue) {
    return this.isAdmin() || (this.user?.Role?.[app] === value);
  }

  hasAnyPermission(app: IApps) {
    return this.isAdmin() || !!this.user?.Role?.[app];
  }

  isCableAdmin() {
    return this.hasPermission(IApps.CABLE, IRoleValue.ADMIN);
  }

  isBSNLAdmin() {
    return this.hasPermission(IApps.BSNL, IRoleValue.ADMIN);
  }

  isUGAdmin() {
    return this.hasPermission(IApps.UG, IRoleValue.ADMIN);
  }

  isTasksAdmin() {
    return this.hasPermission(IApps.TASKS, IRoleValue.ADMIN);
  }

  hasAnyCablePermission() {
    return this.hasAnyPermission(IApps.CABLE);
  }

  hasAnyBSNLPermission() {
    return this.hasAnyPermission(IApps.BSNL);
  }

  hasAnyUGPermission() {
    return this.hasAnyPermission(IApps.UG);
  }

  hasAnyTasksPermission() {
    return this.hasAnyPermission(IApps.TASKS);
  }
}
