import { NgModule } from '@angular/core';

import { AppCommonModule } from '../../common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  imports: [AppCommonModule.forChild(), DashboardRoutingModule],
  declarations: [DashboardComponent],
})
export class DashboardModule {}
