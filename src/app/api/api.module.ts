import { ModuleWithProviders, NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { ApiAuthService } from './auth.service';
import { AuthHttpInterceptor } from './interceptor.service';
import { ApiAppScriptService } from './appscript.service';
import { ApiGSheetDataService } from './gsheetdata.service';

@NgModule({
  imports: [HttpClientModule],
  exports: [],
})
export class ApiModule {
  static forRoot(): ModuleWithProviders<ApiModule> {
    return {
      ngModule: ApiModule,
      providers: [
        ApiAppScriptService,
        ApiAuthService,
        ApiGSheetDataService,
        { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
      ],
    };
  }

  static forChild(): ModuleWithProviders<ApiModule> {
    return {
      ngModule: ApiModule,
      providers: []
    };
  }
}
