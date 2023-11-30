import { ModuleWithProviders, NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { ApiAuthService } from './auth.service';
import { AuthHttpInterceptor } from './interceptor.service';
import { ApiAppScriptService } from './appscript.service';
import { ApiGSheetDataService } from './gsheetdata.service';
import { ApiFileSystemService } from './filesystem.service';
import { ApiStorageService } from './storage.service';
import { ApiBSNLConnectService } from './bsnl-connect.service';

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
        ApiBSNLConnectService,
        ApiGSheetDataService,
        ApiFileSystemService,
        ApiStorageService,
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
