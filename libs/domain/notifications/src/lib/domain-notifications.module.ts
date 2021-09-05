import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {UikitCoreModule} from '@setgo/uikit/core';

import {Atoms, Molecules} from './components';

@NgModule({
  imports: [CommonModule, UikitCoreModule],
  declarations: [...Atoms.COMPONENTS, ...Molecules.COMPONENTS],
  exports: [...Atoms.COMPONENTS, ...Molecules.COMPONENTS],
})
export class DomainNotificationsModule {
}
