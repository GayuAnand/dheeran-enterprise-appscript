import { Component, EventEmitter, Input, Output } from '@angular/core';

import { BaseComponent } from '../base.component';

@Component({
  selector: 'de-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent extends BaseComponent {
  @Input() title = '';

  @Input() content = '';

  @Input() processing = false;

  @Output() public readonly onSuccess = new EventEmitter<void>();

  @Output() public readonly onCancel = new EventEmitter<void>();
}
