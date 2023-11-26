import { Component } from '@angular/core';

import { FileSystemService } from './api';
import { BaseComponent, UiBundleUpdaterService } from './common';

@Component({
  selector: 'de-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent extends BaseComponent {
  constructor(
    private uiBundleUpdaterService: UiBundleUpdaterService,
    private fileSystemService: FileSystemService,
  ) {
    super();
    this.uiBundleUpdaterService.initialize();
    this.fileSystemService.cleanupUnknownFiles();
  }
}

