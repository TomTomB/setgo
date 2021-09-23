import { CommonModule } from '@angular/common';
import { DomainNotificationsModule } from '@setgo/domain/notifications';
import { NgModule } from '@angular/core';
import { Organisms } from './components';
import { UikitCommonModule } from '@setgo/uikit/common';
import { UikitCoreModule } from '@setgo/uikit/core';
import { UikitFormsModule } from '@setgo/uikit/forms';

@NgModule({
  imports: [
    CommonModule,
    DomainNotificationsModule,
    UikitCommonModule,
    UikitCoreModule,
    UikitFormsModule,
  ],
  declarations: [...Organisms.COMPONENTS],
  exports: [...Organisms.COMPONENTS],
})
export class DomainShellModule {}
