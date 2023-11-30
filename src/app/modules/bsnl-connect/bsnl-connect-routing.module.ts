import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BSNLConnectComponent } from './bsnl-connect.component';

const routes: Routes = [
  {
    path: '',
    component: BSNLConnectComponent,
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
export class BSNLConnectRoutingModule {}
