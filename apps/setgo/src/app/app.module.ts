import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { FirebaseModule } from './modules/firebase.module';
import { Router, RouterModule } from '@angular/router';
import { TestComponent } from './test.component';
import { TraceService, createErrorHandler } from '@sentry/angular';

@NgModule({
  declarations: [AppComponent, TestComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'sgs' }),
    RouterModule.forRoot(
      [
        {
          path: '',
          pathMatch: 'full',
          component: TestComponent,
        },
        {
          path: '**',
          redirectTo: '/',
        },
      ],
      {
        initialNavigation: 'enabled',
        anchorScrolling: 'enabled',
        paramsInheritanceStrategy: 'always',
        scrollPositionRestoration: 'enabled',
      },
    ),
    FirebaseModule,
  ],
  providers: [
    {
      provide: ErrorHandler,
      useValue: createErrorHandler({
        showDialog: true,
      }),
    },
    {
      provide: TraceService,
      deps: [Router],
    },
    {
      provide: APP_INITIALIZER,
      useFactory: () => () => {
        // Stub
      },
      deps: [TraceService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
