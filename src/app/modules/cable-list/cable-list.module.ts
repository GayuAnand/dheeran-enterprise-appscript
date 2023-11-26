import { NgModule } from '@angular/core';

import { AppCommonModule } from '../../common';
import { CableListComponent } from './cable-list.component';
import { CableListRoutingModule } from './cable-list-routing.module';
import { CustomerCardComponent } from './customer-card/customer-card.component';

@NgModule({
  imports: [AppCommonModule.forChild(), CableListRoutingModule],
  declarations: [
    CableListComponent,
    CustomerCardComponent,
  ],
})
export class CableListModule {}
