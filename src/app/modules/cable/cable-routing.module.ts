import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CableListComponent } from './cable-list/cable-list.component';
import { CableStatisticsComponent } from './cable-statistics/cable-statistics.component';
import { CableOfflineUpdateComponent } from './cable-offline-update/cable-offline-update.component';

const routes: Routes = [
  {
    path: 'list',
    component: CableListComponent,
  },
  {
    path: 'statistics',
    component: CableStatisticsComponent,
  },
  {
    path: 'offline-updates',
    component: CableOfflineUpdateComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CableListRoutingModule {}
