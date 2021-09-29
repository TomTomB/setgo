import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorMessagePipe } from '../../../../pipes';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { LabelComponent, TextInputComponent } from '../../../atoms';
import { TextFieldComponent } from './text-field.component';

describe('TextFieldComponent', () => {
  let component: TextFieldComponent;
  let fixture: ComponentFixture<TextFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TextFieldComponent,
        TextInputComponent,
        LabelComponent,
        ErrorMessagePipe,
      ],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextFieldComponent);
    component = fixture.componentInstance;
    component.inputId = 'abc';
    component.control = new FormControl();
    component.label = 'label';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
