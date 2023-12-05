import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppCommonModule, PageLayoutComponent, AuthGuard, NonauthGuard, RoleGuard } from './common';
import { IApps, IRoleValue } from './common/interfaces';

const routes: Routes = [
  {
    path: 'app',
    component: PageLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./modules/dashboard').then((m) => m.DashboardModule),
      },
      {
        path: 'cable-list',
        loadChildren: () => import('./modules/cable-list').then((m) => m.CableListModule),
        canActivate: [RoleGuard(IApps.CABLE)],
      },
      {
        path: 'bsnl-connect',
        loadChildren: () => import('./modules/bsnl-connect').then((m) => m.BSNLConnectModule),
        canActivate: [RoleGuard(IApps.BSNL)],
      },
      {
        path: 'ug-patrol',
        loadChildren: () => import('./modules/ug-patrol').then((m) => m.UGPatrolModule),
        canActivate: [RoleGuard(IApps.UG)],
      },
      {
        path: 'maintenance',
        loadChildren: () => import('./modules/maintenance').then((m) => m.MaintenanceModule),
        canActivate: [RoleGuard(IApps.ADMIN)],
      },
      {
        path: '**',
        redirectTo: 'dashboard',
      },
    ],
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth').then((m) => m.AuthModule),
    canActivate: [NonauthGuard],
  },
  {
    path: '**',
    redirectTo: 'app',
  },
];

@NgModule({
  imports: [AppCommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
