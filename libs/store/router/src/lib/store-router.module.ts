import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {NavigationActionTiming, routerReducer, RouterState, StoreRouterConnectingModule,} from '@ngrx/router-store';
import {StoreModule} from '@ngrx/store';

import {ROUTER_FEATURE_KEY} from './state/router/router.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(ROUTER_FEATURE_KEY, routerReducer),
    StoreRouterConnectingModule.forRoot({
      navigationActionTiming: NavigationActionTiming.PostActivation,
      routerState: RouterState.Minimal,
      stateKey: ROUTER_FEATURE_KEY,
    }),
  ],
})
export class StoreRouterModule {
}
