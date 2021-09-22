import * as Models from './notifications.models';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceBase, defineResponseType } from '@tomtomb/ngrx-toolkit';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService extends ServiceBase {
  constructor(private _http: HttpClient) {
    super(_http, 'https://example.com');
  }

  getFoo(args: Models.GetFooArgs) {
    return this.get({
      apiRoute: (p) => `/foo/${p.slug}`,
      httpOpts: args,
      responseType: defineResponseType<null>(),
    });
  }
}
