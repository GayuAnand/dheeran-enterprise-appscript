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
        path: 'cable',
        loadChildren: () => import('./modules/cable').then((m) => m.CableModule),
        canActivate: [RoleGuard(IApps.CABLE)],
      },
      {
        path: 'nklcable',
        loadChildren: () => import('./modules/nklcable').then((m) => m.NklCableModule),
        canActivate: [RoleGuard(IApps.NKLCABLE)],
        data: { nklAccount: true },
      },
      {
        path: 'bsnl',
        loadChildren: () => import('./modules/bsnl').then((m) => m.BSNLConnectModule),
        canActivate: [RoleGuard(IApps.BSNL)],
      },
      {
        path: 'tasks',
        loadChildren: () => import('./modules/tasks').then((m) => m.TasksModule),
        canActivate: [RoleGuard(IApps.TASKS)],
      },
      {
        path: 'ug',
        loadChildren: () => import('./modules/ug').then((m) => m.UGPatrolModule),
        canActivate: [RoleGuard(IApps.UG)],
      },
      {
        path: 'utility',
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
    path: 'cablebill',
    loadChildren: () => import('./modules/cablebill').then((m) => m.CableBillModule),
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
