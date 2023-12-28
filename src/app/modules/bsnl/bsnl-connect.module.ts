import { NgModule } from '@angular/core';

import { AppCommonModule } from '../../common';
import { BSNLConnectComponent } from './bsnl-connect.component';
import { BSNLConnectRoutingModule } from './bsnl-connect-routing.module';

@NgModule({
  imports: [AppCommonModule.forChild(), BSNLConnectRoutingModule],
  declarations: [BSNLConnectComponent],
})
export class BSNLConnectModule {}
