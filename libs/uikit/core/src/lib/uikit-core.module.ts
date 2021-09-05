import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {IconModule} from '@visurel/iconify-angular';

import {DIRECTIVES} from './directives';

@NgModule({
  imports: [CommonModule, IconModule],
  declarations: [...DIRECTIVES],
  exports: [...DIRECTIVES, IconModule],
})
export class UikitCoreModule {
}
