import { Animations } from '@setgo/uikit/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { NotificationsFacade } from '@setgo/store/notifications';
import { ServiceWorkerFacade } from '@setgo/store/service-worker';

@Component({
  selector: 'setgo-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  animations: [Animations.growShrink],
})
export class AppComponent implements OnInit {
  constructor(
    private _serviceWorkerFacade: ServiceWorkerFacade,
    private _notificationsFacade: NotificationsFacade,
  ) {}

  ngOnInit(): void {
    this._serviceWorkerFacade.startPolling();

    this._serviceWorkerFacade.availableUpdate$.subscribe((v) => {
      if (v) {
        this._notificationsFacade.addNotificationMessage({
          appletName: 'SET.GO. Updater',
          body: v.available.appData.update.notes,
          title: `Aktualisierung verfügbar (v${v.available.appData.update.version.semver.version}) `,
        });
      }
    });
  }
}
