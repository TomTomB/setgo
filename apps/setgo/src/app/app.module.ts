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
import { UikitCommonModule } from '@setgo/uikit/common';

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
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
