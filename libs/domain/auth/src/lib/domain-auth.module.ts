import { CommonModule } from '@angular/common';
import { DomainAuthRoutingModule } from './domain-auth-routing.module';
import { NgModule } from '@angular/core';
import { Templates, Views } from './components';
import { UikitCommonModule } from '@setgo/uikit/common';
import { UikitCoreModule } from '@setgo/uikit/core';
import { UikitFormsModule } from '@setgo/uikit/forms';

@NgModule({
  imports: [
    CommonModule,
    DomainAuthRoutingModule,
    UikitCommonModule,
    UikitCoreModule,
    UikitFormsModule,
  ],
  declarations: [...Views.COMPONENTS, ...Templates.COMPONENTS],
})
export class DomainAuthModule {}
