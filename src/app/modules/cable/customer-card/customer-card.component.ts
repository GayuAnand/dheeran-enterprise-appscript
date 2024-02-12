import { Component, Input } from '@angular/core';

import { BaseComponent } from 'src/app/common';
import { CustomerModel } from 'src/app/models';

@Component({
  selector: 'de-customer-card',
  templateUrl: './customer-card.component.html',
  styleUrls: ['./customer-card.component.scss']
})
export class CustomerCardComponent extends BaseComponent {
  @Input() customer!: CustomerModel;

  @Input() nklAccount = false;

  showPaymentQrCode = false;

  showMiniMap = false;

  isCableAdmin() {
    return this.nklAccount ? this.authService.isNklCableAdmin() : this.authService.isCableAdmin();
  }
}
