import { NgModule } from '@angular/core';

import { AppCommonModule } from '../../common';
import { TasksRoutingModule } from './tasks-routing.module';
import { TasksListComponent } from './tasks-list/tasks-list.component';

@NgModule({
  imports: [AppCommonModule.forChild(), TasksRoutingModule],
  declarations: [
    TasksListComponent,
  ],
  providers: [
  ]
})
export class TasksModule {}
