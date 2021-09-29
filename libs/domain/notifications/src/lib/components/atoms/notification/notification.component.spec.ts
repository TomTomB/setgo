import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NOTIFICATION_MESSAGE_MOCK } from '@setgo/store/notifications';
import { NotificationComponent } from './notification.component';
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
    component.notificationMessage = NOTIFICATION_MESSAGE_MOCK;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
