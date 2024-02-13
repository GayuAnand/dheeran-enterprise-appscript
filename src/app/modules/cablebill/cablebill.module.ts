import { NgModule } from '@angular/core';

import { AppCommonModule } from '../../common';
import { CableBillComponent } from './cablebill-preview/cablebill-preview.component';
import { CableBillRoutingModule } from './cablebill-routing.module';

@NgModule({
  imports: [AppCommonModule.forChild(), CableBillRoutingModule],
  declarations: [CableBillComponent],
})
export class CableBillModule {}
