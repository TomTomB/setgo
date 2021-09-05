import { Atoms, Molecules } from './components';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PIPES } from './pipes';
import { ReactiveFormsModule } from '@angular/forms';

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
export class UikitFormsModule {}
