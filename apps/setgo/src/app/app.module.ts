import { AppComponent } from './app.component';
import {
  AppRoutingModule,
  FirebaseModule,
  NgRxModule,
  SentryModule,
} from './modules';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgRxToolkitModule } from '@tomtomb/ngrx-toolkit';
import { ServiceWorkerModule } from '@angular/service-worker';
import { UikitCommonModule } from '@setgo/uikit/common';
import { UikitCoreModule } from '@setgo/uikit/core';
import { UikitFormsModule } from '@setgo/uikit/forms';
import { environment } from '@setgo/env';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'sgs' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    FirebaseModule,
    NgRxModule,
    NgRxToolkitModule,
    SentryModule,
    UikitCommonModule,
    UikitCoreModule,
    UikitFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
