import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppCommonModule, PageLayoutComponent, AuthGuard, NonauthGuard, IframeComponent } from './common';

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
      },
      {
        path: 'bsnl-connect',
        loadChildren: () => import('./modules/bsnl-connect').then((m) => m.BSNLConnectModule),
      },
      {
        path: 'ug-patrol',
        loadChildren: () => import('./modules/ug-patrol').then((m) => m.UGPatrolModule),
      },
      {
        path: '**',
        redirectTo: 'cable-list',
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
