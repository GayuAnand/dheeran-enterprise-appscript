import { Component, Input } from '@angular/core';

import { BaseComponent } from '../base.component';

export const MobileNumberDisplayType = {
  TEXT: "TEXT",
  CALL: "CALL",
  WHATSAPP: "WHATSAPP",
}

@Component({
  selector: 'de-mobile-number',
  template: `<de-copyable-text *ngIf="displayType === displayTypes.TEXT" [text]="mobile"></de-copyable-text>
<a *ngIf="displayType === displayTypes.CALL" href="tel:{{mobile}}" (click)="utilService.stopEventPropagation($event)"><mat-icon class="call-icon">call</mat-icon></a>
<a *ngIf="displayType === displayTypes.WHATSAPP" href="https://wa.me/{{mobile}}" target="_blank" (click)="utilService.stopEventPropagation($event)"><mat-icon svgIcon="whatsapp"></mat-icon></a>`,
  styles: [`
mat-icon {
  font-size: 28px;
  height: 28px;
  width: 28px;
}
mat-icon.call-icon {
  font-size: 24px;
  height: 24px;
  width: 24px;
}
`]
})
export class MobileNumberComponent extends BaseComponent {
  @Input() mobile = '';

  @Input() displayType = MobileNumberDisplayType.TEXT;

  displayTypes = MobileNumberDisplayType;

  copyText(event: MouseEvent) {
    event.stopPropagation();
    this.utilService.copyToClipboard(this.mobile);
  }
}
