import { CommonModule } from '@angular/common';
import { DIRECTIVES } from './directives';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [CommonModule],
  declarations: [...DIRECTIVES],
  exports: [...DIRECTIVES],
})
export class UikitCoreModule {}
