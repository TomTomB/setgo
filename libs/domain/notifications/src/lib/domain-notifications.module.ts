import { Atoms, Molecules, Organisms } from './components';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UikitCoreModule } from '@setgo/uikit/core';

@NgModule({
  imports: [CommonModule, UikitCoreModule],
  declarations: [
    ...Atoms.COMPONENTS,
    ...Molecules.COMPONENTS,
    ...Organisms.COMPONENTS,
  ],
  exports: [
    ...Atoms.COMPONENTS,
    ...Molecules.COMPONENTS,
    ...Organisms.COMPONENTS,
  ],
})
export class DomainNotificationsModule {}
