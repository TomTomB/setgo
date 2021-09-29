import { AuthHostComponent } from './auth-host.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthHostComponent', () => {
  let component: AuthHostComponent;
  let fixture: ComponentFixture<AuthHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthHostComponent],
      imports: [RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
