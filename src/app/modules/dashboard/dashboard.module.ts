import { NgModule } from '@angular/core';

import { AppCommonModule } from '../../common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  imports: [AppCommonModule, DashboardRoutingModule],
  declarations: [DashboardComponent],
})
export class DashboardModule {}
