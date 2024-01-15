import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UGPatrolComponent } from './ug-patrol-list/ug-patrol-list.component';
import { UGWorkListComponent } from './ug-work-list/ug-work-list.component';
import { UGPatrolStatisticsComponent } from './ug-patrol-statistics/ug-patrol-statistics.component';

const routes: Routes = [
  {
    path: 'patrol-list',
    component: UGPatrolComponent,
  },
  {
    path: 'work-list',
    component: UGWorkListComponent,
  },
  {
    path: 'patrol-statistics',
    component: UGPatrolStatisticsComponent,
  },
  {
    path: '**',
    redirectTo: 'patrol-list',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UGPatrolRoutingModule {}
