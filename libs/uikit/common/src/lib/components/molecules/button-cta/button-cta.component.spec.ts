import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SpinnerComponent} from '../../atoms/spinner/spinner.component';

import {ButtonCTAComponent} from './button-cta.component';

describe('ButtonCTAComponent', () => {
  let component: ButtonCTAComponent;
  let fixture: ComponentFixture<ButtonCTAComponent>;

  beforeEach(async () => {
    await TestBed
        .configureTestingModule({
          declarations: [ButtonCTAComponent, SpinnerComponent],
        })
        .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonCTAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
