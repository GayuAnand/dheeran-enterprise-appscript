import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { ApiAuthService } from './auth.service';
import { AuthHttpInterceptor } from './interceptor.service';
import { ApiAppScriptService } from './appscript.service';

@NgModule({
  imports: [HttpClientModule],
  exports: [],
  providers: [
    ApiAppScriptService,
    ApiAuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
  ],
})
export class ApiModule {}
