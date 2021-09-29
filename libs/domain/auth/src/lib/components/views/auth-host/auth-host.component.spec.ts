import { AuthHostViewComponent } from './auth-host.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthHostViewComponent', () => {
  let component: AuthHostViewComponent;
  let fixture: ComponentFixture<AuthHostViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthHostViewComponent],
      imports: [RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthHostViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
