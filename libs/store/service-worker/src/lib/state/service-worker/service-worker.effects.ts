import * as FeatureActions from './service-worker.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { ServiceWorkerService } from './service-worker.service';
import {
  catchError,
  map,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class ServiceWorkerEffects {
  checkForUpdate$ = createEffect(() =>
    this._actions$.pipe(
      ofType(FeatureActions.checkForUpdate),
      switchMap(() => this._featureService.checkForUpdate()),
      withLatestFrom(this._featureService.updateAvailable$),
      map(([, update]) => {
        if (update) {
          return FeatureActions.updateAvailable({ update });
        } else {
          return FeatureActions.noUpdateAvailable();
        }
      }),
      catchError(() => of(FeatureActions.noUpdateAvailable())),
    ),
  );

  activateUpdate$ = createEffect(() =>
    this._actions$.pipe(
      ofType(FeatureActions.activateUpdate),
      switchMap(() => this._featureService.activateUpdate()),
      withLatestFrom(this._featureService.updateActivated$),
      tap(() => document.location.reload()),
      map(([, update]) => {
        if (update) {
          return FeatureActions.updateActivated({ update });
        } else {
          return FeatureActions.updateNotActivated();
        }
      }),
      catchError(() => of(FeatureActions.updateNotActivated())),
    ),
  );

  constructor(
    private _actions$: Actions,
    private _featureService: ServiceWorkerService,
  ) {}
}
