import { AppComponent } from './app.component';
import {
  AppRoutingModule,
  FirebaseModule,
  NgRxModule,
  SentryModule,
} from './modules';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TestComponent } from './test.component';

@NgModule({
  declarations: [AppComponent, TestComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'sgs' }),
    AppRoutingModule,
    SentryModule,
    NgRxModule,
    FirebaseModule,
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
