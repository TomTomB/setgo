import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { DIRECTIVES } from './directives';
import { IconModule } from '@visurel/iconify-angular';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [A11yModule, CommonModule, IconModule],
  declarations: [...DIRECTIVES],
  exports: [...DIRECTIVES, A11yModule, IconModule],
})
export class UikitCoreModule {}
