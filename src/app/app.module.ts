import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ApiModule } from './api';
import { AppCommonModule } from './common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [ApiModule.forRoot(), AppCommonModule.forRoot(), BrowserModule, AppRoutingModule, BrowserAnimationsModule],
  exports: [AppCommonModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
