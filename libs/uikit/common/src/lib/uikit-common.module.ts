import { Atoms, Molecules } from './components';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [CommonModule],
  declarations: [...Atoms.COMPONENTS, ...Molecules.COMPONENTS],
  exports: [...Atoms.COMPONENTS, ...Molecules.COMPONENTS],
})
export class UikitCommonModule {}
