import { NgModule } from '@angular/core';

import { AppCommonModule } from '../../common';
import { UGPatrolComponent } from './ug-patrol-list/ug-patrol.component';
import { UGPatrolRoutingModule } from './ug-patrol-routing.module';
import { UGPatrolStatisticsComponent } from './ug-patrol-statistics/ug-patrol-statistics.component';

@NgModule({
  imports: [AppCommonModule.forChild(), UGPatrolRoutingModule],
  declarations: [UGPatrolComponent, UGPatrolStatisticsComponent],
})
export class UGPatrolModule {}
