import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TasksListComponent } from './tasks-list/tasks-list.component';

const routes: Routes = [
  {
    path: 'list',
    component: TasksListComponent,
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
export class TasksRoutingModule {}
