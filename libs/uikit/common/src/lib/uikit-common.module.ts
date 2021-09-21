import { Atoms, Molecules } from './components';
import { CommonModule } from '@angular/common';
import { MenuModule } from './components/atoms/menu/menu.module';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [CommonModule, MenuModule],
  declarations: [...Atoms.COMPONENTS, ...Molecules.COMPONENTS],
  exports: [...Atoms.COMPONENTS, ...Molecules.COMPONENTS, MenuModule],
})
export class UikitCommonModule {}
