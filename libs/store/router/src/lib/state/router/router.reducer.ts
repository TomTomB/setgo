import { Data, Params, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { RouterReducerState, RouterStateSerializer } from '@ngrx/router-store';

export const ROUTER_FEATURE_KEY = 'router';

export interface RouterStateUrl {
  url: string;
  params: Params;
  queryParams: Params;
  data: Data;
}

export type State = RouterReducerState<RouterStateUrl>;

export interface RouterPartialState {
  readonly [ROUTER_FEATURE_KEY]: State;
}

@Injectable()
export class CustomRouterStateSerializer
  implements RouterStateSerializer<RouterStateUrl>
{
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    let route = routerState.root;
    while (route.firstChild) {
      route = route.firstChild;
    }

    const { url } = routerState;
    const queryParams = routerState.root.queryParams;
    const { params, data } = route;

    return { url, params, queryParams, data };
  }
}
