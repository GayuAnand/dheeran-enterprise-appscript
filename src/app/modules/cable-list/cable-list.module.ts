import { NgModule } from '@angular/core';

import { AppCommonModule } from '../../common';
import { CableListComponent } from './cable-list.component';
import { CableListRoutingModule } from './cable-list-routing.module';

@NgModule({
  imports: [AppCommonModule.forChild(), CableListRoutingModule],
  declarations: [CableListComponent],
})
export class CableListModule {}
