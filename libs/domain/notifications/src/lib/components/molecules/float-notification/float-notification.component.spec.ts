import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  NOTIFICATION_GROUP_MOCK,
  NOTIFICATION_MOCK,
} from '@setgo/store/notifications';
import { NotificationComponent } from '../../atoms';
import { UikitCoreModule } from '@setgo/uikit/core';

import { FloatNotificationComponent } from './float-notification.component';

describe('FloatNotificationComponent', () => {
  let component: FloatNotificationComponent;
  let fixture: ComponentFixture<FloatNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FloatNotificationComponent, NotificationComponent],
      imports: [UikitCoreModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FloatNotificationComponent);
    component = fixture.componentInstance;
    component.notificationMessage = {
      ...NOTIFICATION_MOCK,
      group: NOTIFICATION_GROUP_MOCK,
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
