import { CommonModule } from '@angular/common';
import { DomainAuthRoutingModule } from './domain-auth-routing.module';
import { NgModule } from '@angular/core';
import { UikitCommonModule } from '@setgo/uikit/common';
import { UikitCoreModule } from '@setgo/uikit/core';
import { UikitFormsModule } from '@setgo/uikit/forms';
import { Views } from './components';

@NgModule({
  imports: [
    CommonModule,
    DomainAuthRoutingModule,
    UikitCommonModule,
    UikitCoreModule,
    UikitFormsModule,
  ],
  declarations: [...Views.COMPONENTS],
})
export class DomainAuthModule {}
