import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationComponent } from './notification.component';
import { NotificationMessage } from '../../../types';
import { UikitCoreModule } from '@setgo/uikit/core';

describe('NotificationComponent', () => {
  let component: NotificationComponent;
  let fixture: ComponentFixture<NotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotificationComponent],
      imports: [UikitCoreModule],
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

    component.notificationMessage = notification;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
