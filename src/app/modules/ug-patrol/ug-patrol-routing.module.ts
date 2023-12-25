import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UGPatrolComponent } from './ug-patrol-list/ug-patrol.component';
import { UGPatrolStatisticsComponent } from './ug-patrol-statistics/ug-patrol-statistics.component';

const routes: Routes = [
  {
    path: 'list',
    component: UGPatrolComponent,
  },
  {
    path: 'statistics',
    component: UGPatrolStatisticsComponent,
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
export class UGPatrolRoutingModule {}
