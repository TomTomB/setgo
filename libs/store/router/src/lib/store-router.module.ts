import { CommonModule } from '@angular/common';
import {
  NavigationActionTiming,
  RouterState,
  StoreRouterConnectingModule,
  routerReducer,
} from '@ngrx/router-store';
import { NgModule } from '@angular/core';
import { ROUTER_FEATURE_KEY } from './state/router/router.reducer';
import { StoreModule } from '@ngrx/store';

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
export class StoreRouterModule {}
