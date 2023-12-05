import { NgModule } from '@angular/core';

import { AppCommonModule } from '../../common';
import { MaintenanceComponent } from './maintenance.component';
import { MaintenanceRoutingModule } from './maintenance-routing.module';

@NgModule({
  imports: [AppCommonModule.forChild(), MaintenanceRoutingModule],
  declarations: [MaintenanceComponent],
})
export class MaintenanceModule {}
