import { NgModule } from '@angular/core';

import { AppCommonModule } from '../../common';
import { BSNLListComponent } from './list/bsnl-list.component';
import { BSNLConnectRoutingModule } from './bsnl-routing.module';
import { BSNLConnectComponent } from './connect/connect.component';
import { BSNLRefreshFMSDetailsComponent } from './bsnl-refresh-fms-details/bsnl-refresh-fms-details.component';

@NgModule({
  imports: [AppCommonModule.forChild(), BSNLConnectRoutingModule],
  declarations: [BSNLConnectComponent, BSNLListComponent, BSNLRefreshFMSDetailsComponent],
})
export class BSNLConnectModule {}
