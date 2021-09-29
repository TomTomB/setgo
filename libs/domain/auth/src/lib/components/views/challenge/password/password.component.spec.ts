import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengePasswordComponent } from './password.component';

describe('ChallengePasswordComponent', () => {
  let component: ChallengePasswordComponent;
  let fixture: ComponentFixture<ChallengePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChallengePasswordComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
