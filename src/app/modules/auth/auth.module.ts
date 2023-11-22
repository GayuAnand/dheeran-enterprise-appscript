import { NgModule } from '@angular/core';

import { AppCommonModule } from '../../../../src/app/common';
import { SignInComponent } from './signin/signin.component';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  imports: [AppCommonModule, AuthRoutingModule],
  declarations: [SignInComponent],
})
export class AuthModule {}
