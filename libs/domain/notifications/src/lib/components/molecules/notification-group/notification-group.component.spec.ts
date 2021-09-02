import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NOTIFICATION_GROUP_MOCK } from '../../../mocks';
import { NotificationComponent } from '../../atoms';
import { NotificationGroupComponent } from './notification-group.component';

describe('NotificationGroupComponent', () => {
  let component: NotificationGroupComponent;
  let fixture: ComponentFixture<NotificationGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotificationGroupComponent, NotificationComponent],
      imports: [BrowserAnimationsModule],
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
