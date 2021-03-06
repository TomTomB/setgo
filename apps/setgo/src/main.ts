import * as Sentry from '@sentry/angular';
import { AppModule } from './app/app.module';
import { Integrations } from '@sentry/tracing';
import { enableProdMode } from '@angular/core';
import { environment } from '@setgo/env';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

Sentry.init({
  dsn: 'https://8be6fdd90748407d8fc6c6c881ae2793@o512127.ingest.sentry.io/5820485',
  integrations: [
    new Integrations.BrowserTracing({
      tracingOrigins: ['localhost'],
      routingInstrumentation: Sentry.routingInstrumentation,
    }),
  ],
  enabled: environment.production,
  tracesSampleRate: 1.0,
});

if (environment.production) {
  enableProdMode();
}

document.addEventListener('DOMContentLoaded', () => {
  platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch((err) => console.error(err));
});
