import { NgModule } from '@angular/core';

import { AppCommonModule } from '../../common';
import { CableService } from './cable.service';
import { CableListRoutingModule } from './cable-routing.module';
import { CableListComponent } from './cable-list/cable-list.component';
import { CustomerCardComponent } from './customer-card/customer-card.component';
import { CableStatisticsComponent } from './cable-statistics/cable-statistics.component';
import { CableOfflineUpdateComponent } from './cable-offline-update/cable-offline-update.component';

@NgModule({
  imports: [AppCommonModule.forChild(), CableListRoutingModule],
  declarations: [
    CableListComponent,
    CableStatisticsComponent,
    CustomerCardComponent,
    CableOfflineUpdateComponent,
  ],
  providers: [
    CableService
  ]
})
export class CableModule {}
