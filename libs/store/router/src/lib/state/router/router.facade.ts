import {Injectable} from '@angular/core';
import {Data, Params} from '@angular/router';
import {Store} from '@ngrx/store';
import {BehaviorSubject} from 'rxjs';

import * as fromReducer from './router.reducer';
import * as Selectors from './router.selectors';

@Injectable({providedIn: 'root'})
export class RouterFacade {
  private _data$ = new BehaviorSubject<Data>({});
  private _navigationId$ = new BehaviorSubject<number>(-1);
  private _params$ = new BehaviorSubject<Params>({});
  private _queryParams$ = new BehaviorSubject<Params>({});
  private _url$ = new BehaviorSubject<string>('');

  data$ = this.store.select(Selectors.getData);
  navigationId$ = this.store.select(Selectors.getNavigationId);
  params$ = this.store.select(Selectors.getParams);
  queryParams$ = this.store.select(Selectors.getQueryParams);
  url$ = this.store.select(Selectors.getUrl);

  get data() {
    return this._data$.value;
  }

  get navigationId() {
    return this._navigationId$.value;
  }

  get params() {
    return this._params$.value;
  }

  get queryParams() {
    return this._queryParams$.value;
  }

  get url() {
    return this._url$.value;
  }

  constructor(private store: Store<fromReducer.RouterPartialState>) {
    this.data$.subscribe(this._data$);
    this.navigationId$.subscribe(this._navigationId$);
    this.params$.subscribe(this._params$);
    this.queryParams$.subscribe(this._queryParams$);
    this.url$.subscribe(this._url$);
  }

  selectParam(key: string) {
    return this.store.select(Selectors.getParam(key));
  }

  selectQueryParam(key: string) {
    return this.store.select(Selectors.getQueryParam(key));
  }
}
