import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationMessage } from '../../../types';

import { NotificationComponent } from './notification.component';

describe('NotificationComponent', () => {
  let component: NotificationComponent;
  let fixture: ComponentFixture<NotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotificationComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationComponent);
    component = fixture.componentInstance;

    const notification: NotificationMessage = {
      id: '1',
      body: 'Test',
      timestamp: Date.now(),
      title: 'Test',
    };

    component.notificationGroup = {
      appletName: 'Test',
      id: '1',
      messages: [notification],
    };
    component.notificationMessage = notification;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
