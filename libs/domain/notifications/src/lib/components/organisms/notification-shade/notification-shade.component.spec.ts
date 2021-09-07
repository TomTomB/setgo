import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationGroupComponent } from '../../molecules/notification-group/notification-group.component';
import { NotificationShadeComponent } from './notification-shade.component';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreTestingModule } from '@setgo/store/testing';

describe('NotificationShadeComponent', () => {
  let component: NotificationShadeComponent;
  let fixture: ComponentFixture<NotificationShadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotificationShadeComponent, NotificationGroupComponent],
      imports: [StoreTestingModule, RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationShadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
