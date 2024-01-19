import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { BaseComponent } from 'src/app/common';
import { IOltInfo } from 'src/app/common/interfaces';

@Component({
  selector: 'de-olt',
  templateUrl: 'olt.component.html',
  styleUrls: ['./../../../../reusable-styles/page-component.scss', './olt.component.scss'],
})
export class BSNLOltComponent extends BaseComponent implements OnInit {
  activeOlt!: IOltInfo;

  oltUrl: SafeResourceUrl = '';

  constructor(protected sanitizer: DomSanitizer) {
    super();
  }

  ngOnInit(): void {
    this.settingsService.pageTitle = this.TKey.COMMON.OLT;
  }

  activeOltChange() {
    console.log('Active olt changed: ', this.activeOlt);
    this.oltUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`${this.activeOlt.externalAddr}/action/main.html`);
  }
}
