import { NgModule } from '@angular/core';

import { AppCommonModule } from '../../common';
import { BSNLOltComponent } from './olt/olt.component';
import { BSNLListComponent } from './list/bsnl-list.component';
import { BSNLConnectRoutingModule } from './bsnl-routing.module';
import { BSNLConnectComponent } from './connect/connect.component';
import { BSNLRefreshFMSDetailsComponent } from './bsnl-refresh-fms-details/bsnl-refresh-fms-details.component';

@NgModule({
  imports: [AppCommonModule.forChild(), BSNLConnectRoutingModule],
  declarations: [BSNLConnectComponent, BSNLListComponent, BSNLRefreshFMSDetailsComponent, BSNLOltComponent],
})
export class BSNLConnectModule {}
