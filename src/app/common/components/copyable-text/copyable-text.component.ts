import { Component, Input } from '@angular/core';

import { BaseComponent } from '../base.component';

@Component({
  selector: 'de-copyable-text',
  template: `<span (click)="copyText($event)" class="copyable-text">{{text}}</span>`,
  styles: []
})
export class CopyableTextComponent extends BaseComponent {
  @Input() text = '';

  copyText(event: MouseEvent) {
    event.stopPropagation();
    this.utilService.copyToClipboard(this.text);
  }
}
