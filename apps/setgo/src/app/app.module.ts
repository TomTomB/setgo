import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouterModule } from '@angular/router';
import { createErrorHandler, TraceService } from '@sentry/angular';
import { AppComponent } from './app.component';
import { TestComponent } from './test.component';

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
