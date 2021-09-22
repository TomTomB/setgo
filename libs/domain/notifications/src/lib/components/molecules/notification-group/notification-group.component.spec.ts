import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NOTIFICATION_GROUP_MOCK } from '@setgo/store/notifications';
import { NotificationComponent } from '../../atoms';
import { NotificationGroupComponent } from './notification-group.component';
import { UikitCoreModule } from '@setgo/uikit/core';

describe('NotificationGroupComponent', () => {
  let component: NotificationGroupComponent;
  let fixture: ComponentFixture<NotificationGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotificationGroupComponent, NotificationComponent],
      imports: [BrowserAnimationsModule, UikitCoreModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationGroupComponent);
    component = fixture.componentInstance;
    component.notificationGroup = NOTIFICATION_GROUP_MOCK;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
