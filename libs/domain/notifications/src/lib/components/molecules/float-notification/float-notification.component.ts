import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { NotificationMessageWithGroup } from '@setgo/store/notifications';
import { assertInputsAreProvided } from '@setgo/core';

@Component({
  selector: 'domain-float-notification',
  templateUrl: './float-notification.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FloatNotificationComponent implements OnInit {
  @Input()
  notificationMessage!: NotificationMessageWithGroup;

  @Output()
  deleteNotification = new EventEmitter<NotificationMessageWithGroup>();

  @Output()
  floatTimeExpired = new EventEmitter<NotificationMessageWithGroup>();

  ngOnInit(): void {
    this._assertInputsAreProvided();

    setTimeout(() => {
      this.floatTimeExpired.emit(this.notificationMessage);
    }, 2500);
  }

  private _assertInputsAreProvided() {
    assertInputsAreProvided({
      notificationMessage: this.notificationMessage,
    });
  }
}
