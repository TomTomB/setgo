import {TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {ServiceWorkerModule} from '@angular/service-worker';
import {DomainNotificationsModule} from '@setgo/domain/notifications';
import {environment} from '@setgo/env';
import {StoreTestingModule} from '@setgo/store/testing';
import {UikitCommonModule} from '@setgo/uikit/common';
import {UikitCoreModule} from '@setgo/uikit/core';
import {UikitFormsModule} from '@setgo/uikit/forms';

import {AppComponent} from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed
        .configureTestingModule({
          declarations: [AppComponent],
          imports: [
            RouterTestingModule,
            UikitCoreModule,
            UikitCommonModule,
            UikitFormsModule,
            DomainNotificationsModule,
            StoreTestingModule,
            ServiceWorkerModule.register('ngsw-worker.js', {
              enabled: environment.production,
              // Register the ServiceWorker as soon as the app is stable
              // or after 30 seconds (whichever comes first).
              registrationStrategy: 'registerWhenStable:30000',
            }),
          ],
        })
        .compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
