import { NgModule } from '@angular/core';

import { AppCommonModule } from '../../common';
import { UGPatrolRoutingModule } from './ug-routing.module';
import { UGPatrolComponent } from './ug-patrol-list/ug-patrol-list.component';
import { UGWorkListComponent } from './ug-work-list/ug-work-list.component';
import { UGPatrolStatisticsComponent } from './ug-patrol-statistics/ug-patrol-statistics.component';

@NgModule({
  imports: [AppCommonModule.forChild(), UGPatrolRoutingModule],
  declarations: [UGPatrolComponent, UGPatrolStatisticsComponent, UGWorkListComponent],
})
export class UGPatrolModule {}
