import * as Selectors from './router.selectors';
import * as fromReducer from './router.reducer';
import { BehaviorSubject } from 'rxjs';
import { Data, Params } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

@Injectable({ providedIn: 'root' })
export class RouterFacade {
  private _data$ = new BehaviorSubject<Data>({});
  private _navigationId$ = new BehaviorSubject<number>(-1);
  private _params$ = new BehaviorSubject<Params>({});
  private _queryParams$ = new BehaviorSubject<Params>({});
  private _url$ = new BehaviorSubject<string>('');

  data$ = this._store.select(Selectors.getData);
  navigationId$ = this._store.select(Selectors.getNavigationId);
  params$ = this._store.select(Selectors.getParams);
  queryParams$ = this._store.select(Selectors.getQueryParams);
  url$ = this._store.select(Selectors.getUrl);

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

  constructor(private _store: Store<fromReducer.RouterPartialState>) {
    this.data$.subscribe(this._data$);
    this.navigationId$.subscribe(this._navigationId$);
    this.params$.subscribe(this._params$);
    this.queryParams$.subscribe(this._queryParams$);
    this.url$.subscribe(this._url$);
  }

  selectParam(key: string) {
    return this._store.select(Selectors.getParam(key));
  }

  selectQueryParam(key: string) {
    return this._store.select(Selectors.getQueryParam(key));
  }
}
