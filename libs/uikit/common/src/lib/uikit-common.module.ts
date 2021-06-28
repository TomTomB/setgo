import { Atoms } from './components';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [CommonModule],
  declarations: [...Atoms.COMPONENTS],
  exports: [...Atoms.COMPONENTS],
})
export class UikitCommonModule {}
