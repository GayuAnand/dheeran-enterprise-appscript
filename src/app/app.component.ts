import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { BaseModel } from './models';
import { ApiFileSystemService } from './api';
import { BaseComponent, UiBundleUpdaterService } from './common';

@Component({
  selector: 'de-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent extends BaseComponent {
  constructor(
    private domSanitizer: DomSanitizer,
    public matIconRegistry: MatIconRegistry,
    private fileSystemService: ApiFileSystemService,
    private uiBundleUpdaterService: UiBundleUpdaterService,
  ) {
    super();
    BaseModel.AuthService = this.authService;
    this.uiBundleUpdaterService.initialize();
    this.fileSystemService.cleanupUnknownFiles();
    this.matIconRegistry.addSvgIcon('whatsapp', this.setPath(`assets/images/whatsapp.svg`));
  }

  private setPath(url: string): SafeResourceUrl {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
