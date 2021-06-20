import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TraceService, createErrorHandler } from '@sentry/angular';

@NgModule({
  imports: [CommonModule],
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
})
export class SentryModule {}
