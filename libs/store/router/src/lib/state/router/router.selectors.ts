import {Params} from '@angular/router';
import {createFeatureSelector, createSelector} from '@ngrx/store';

import {ROUTER_FEATURE_KEY, RouterPartialState, State,} from './router.reducer';

export const getRouterState =
    createFeatureSelector<RouterPartialState, State|undefined>(ROUTER_FEATURE_KEY);

export const getNavigationId = createSelector(
    getRouterState,
    (state) => state?.navigationId || -1,
);
export const getParams = createSelector(
    getRouterState,
    (state) => state?.state.params || {},
);
export const getData = createSelector(
    getRouterState,
    (state) => state?.state.data || {},
);
export const getQueryParams = createSelector(
    getRouterState,
    (state) => state?.state.queryParams || {},
);
export const getUrl = createSelector(
    getRouterState,
    (state) => state?.state.url || '',
);

export const getParam = (key: string) => createSelector(
    getParams,
    (params: Params|undefined) => (params && params[key]) || null,
);

export const getQueryParam = (key: string) => createSelector(
    getQueryParams,
    (params: Params|undefined) => (params && params[key]) || null,
);
