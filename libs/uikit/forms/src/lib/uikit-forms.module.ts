import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';

import {Atoms, Molecules} from './components';
import {PIPES} from './pipes';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [...Atoms.COMPONENTS, ...Molecules.COMPONENTS, ...PIPES],
  exports: [
    ReactiveFormsModule,
    ...Atoms.COMPONENTS,
    ...Molecules.COMPONENTS,
    ...PIPES,
  ],
})
export class UikitFormsModule {
}
