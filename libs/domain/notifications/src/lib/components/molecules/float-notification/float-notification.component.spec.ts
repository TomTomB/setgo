import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationComponent } from '../../atoms';

import { FloatNotificationComponent } from './float-notification.component';

describe('FloatNotificationComponent', () => {
  let component: FloatNotificationComponent;
  let fixture: ComponentFixture<FloatNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FloatNotificationComponent, NotificationComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FloatNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
