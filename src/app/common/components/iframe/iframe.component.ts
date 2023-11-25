import { ActivatedRoute } from '@angular/router';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { BaseComponent } from '../base.component';

@Component({
  selector: 'de-iframe',
  template: `<iframe frameBorder="0" margin="0" padding="0" [src]="src"></iframe>`,
  styleUrls: ['./iframe.component.scss'],
})
export class IframeComponent extends BaseComponent implements OnInit {
  get src(): SafeUrl {
    return this._src;
  }

  set src(value) {
    if (value) {
      // this._src = this.sanitizer.bypassSecurityTrustResourceUrl(
      //   `https://script.google.com/macros/s/AKfycbzlbuvUBaS-l6B50ciYiO9v5rYGgb8oMIigoimzxBbV2ASFvy_xfeiblTajATz_ewiR/exec?redirectPath=${value}&loadLatest=1`
      // );
      this._src = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.wikipedia.org`);
    }
  }

  private _src: SafeUrl = '';

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
  ) {
    super();
  }

  ngOnInit(): void {
    this.src = this.route.snapshot.data?.['redirectPath'];
    setTimeout(() => this.settingsService.pageTitle = this.route.snapshot.data?.['title'] || this.settingsService.pageTitle);
  }
}
