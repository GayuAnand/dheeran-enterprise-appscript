import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UGPatrolComponent } from './ug-patrol.component';

const routes: Routes = [
  {
    path: '',
    component: UGPatrolComponent,
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
export class UGPatrolRoutingModule {}
