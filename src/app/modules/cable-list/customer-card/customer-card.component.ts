import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

import { BaseComponent } from 'src/app/common';
import { CustomerModel } from 'src/app/models';
import { IApps, IRoleValue } from 'src/app/common/interfaces';
import { concatMap } from 'rxjs';

@Component({
  selector: 'de-customer-card',
  templateUrl: './customer-card.component.html',
  styleUrls: ['./customer-card.component.scss']
})
export class CustomerCardComponent extends BaseComponent {
  @Input() customer!: CustomerModel;

  isCableAdmin() {
    return this.authService.hasPermission(IApps.CABLE, IRoleValue.ADMIN);
  }
}
