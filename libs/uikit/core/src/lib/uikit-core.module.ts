import { CommonModule } from '@angular/common';
import { DIRECTIVES } from './directives';
import { IconModule } from '@visurel/iconify-angular';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [CommonModule, IconModule],
  declarations: [...DIRECTIVES],
  exports: [...DIRECTIVES, IconModule],
})
export class UikitCoreModule {}
