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
        path: 'search',
        component: IframeComponent,
        data: {
          title: 'Search',
          redirectPath: 'search',
        }
      },
      {
        path: 'tasks',
        component: IframeComponent,
        data: {
          title: 'Tasks',
          redirectPath: 'tasks',
        }
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
