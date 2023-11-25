import { Component } from '@angular/core';

import { BaseComponent, FileSystemService } from './common';
import { UiBundleUpdaterService } from './common/services/uibundle-updater.service';

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

