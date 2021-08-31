import { Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';

@Injectable()
export class UiShellEffects {
  constructor(private _actions$: Actions) {}
}
