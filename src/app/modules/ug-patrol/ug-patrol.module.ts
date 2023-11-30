import { NgModule } from '@angular/core';

import { AppCommonModule } from '../../common';
import { UGPatrolComponent } from './ug-patrol.component';
import { UGPatrolRoutingModule } from './ug-patrol-routing.module';

@NgModule({
  imports: [AppCommonModule.forChild(), UGPatrolRoutingModule],
  declarations: [UGPatrolComponent],
})
export class UGPatrolModule {}
