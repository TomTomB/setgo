import * as FeatureActions from './notifications.actions';
import { Actions } from '@ngrx/effects';
import { EffectBase } from '@tomtomb/ngrx-toolkit';
import { Injectable } from '@angular/core';
import { NotificationsService } from './notifications.service';

@Injectable()
export class NotificationsEffects extends EffectBase {
  getFoo$ = this.onActionSwitchMap({
    action: FeatureActions.getFoo,
    serviceCall: this.featureService.getFoo,
  });

  constructor(
    private actions$: Actions,
    private featureService: NotificationsService,
  ) {
    super(actions$, featureService);
  }
}
