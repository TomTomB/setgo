import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { DIRECTIVES } from './directives';
import { IconModule } from '@visurel/iconify-angular';
import { LayoutModule } from '@angular/cdk/layout';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [A11yModule, CommonModule, IconModule, LayoutModule],
  declarations: [...DIRECTIVES],
  exports: [...DIRECTIVES, A11yModule, IconModule, LayoutModule],
})
export class UikitCoreModule {}
