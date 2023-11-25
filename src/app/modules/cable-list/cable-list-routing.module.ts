import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CableListComponent } from './cable-list.component';

const routes: Routes = [
  {
    path: '',
    component: CableListComponent,
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
