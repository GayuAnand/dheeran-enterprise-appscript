import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CableBillComponent } from './cablebill-preview/cablebill-preview.component';
import { EmptyLayoutComponent } from '../../common';

const routes: Routes = [
  {
    path: '',
    component: EmptyLayoutComponent,
    children: [
      {
        path: ':id',
        component: CableBillComponent,
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CableBillRoutingModule {}
