import { NgModule } from '@angular/core';

import { AppCommonModule } from '../../common';
import { CableListRoutingModule, CableModule } from '../cable';

@NgModule({
  imports: [AppCommonModule.forChild(), CableListRoutingModule, CableModule],
})
export class NklCableModule {}
