import { AppComponent } from './app.component';
import {
  AppRoutingModule,
  FirebaseModule,
  NgRxModule,
  SentryModule,
} from './modules';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'sgs' }),
    AppRoutingModule,
    FirebaseModule,
    NgRxModule,
    SentryModule,
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
