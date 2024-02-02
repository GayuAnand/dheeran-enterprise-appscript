import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RoleGuard } from 'src/app/common';
import { IApps, IRoleValue } from 'src/app/common/interfaces';
import { BSNLOltComponent } from './olt/olt.component';
import { BSNLListComponent } from './list/bsnl-list.component';
import { BSNLConnectComponent } from './connect/connect.component';
import { BSNLRefreshFMSDetailsComponent } from './bsnl-refresh-fms-details/bsnl-refresh-fms-details.component';

const routes: Routes = [
  {
    path: 'list',
    component: BSNLListComponent,
    canActivate: [RoleGuard(IApps.BSNL)],
  },
  {
    path: 'utility',
    component: BSNLConnectComponent,
    canActivate: [RoleGuard(IApps.BSNL)],
  },
  {
    path: 'sync',
    component: BSNLRefreshFMSDetailsComponent,
    canActivate: [RoleGuard(IApps.BSNL, IRoleValue.ADMIN)],
  },
  {
    path: 'olt',
    component: BSNLOltComponent,
    canActivate: [RoleGuard(IApps.BSNL, IRoleValue.ADMIN)],
  },
  {
    path: '**',
    redirectTo: 'list',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BSNLConnectRoutingModule {}
