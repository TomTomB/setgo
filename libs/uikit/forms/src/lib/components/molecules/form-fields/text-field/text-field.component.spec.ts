import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorMessagePipe } from '../../../../pipes';
import { ReactiveFormsModule } from '@angular/forms';
import { TextFieldComponent } from './text-field.component';
import { TextInputComponent } from '../../../atoms';

describe('TextFieldComponent', () => {
  let component: TextFieldComponent;
  let fixture: ComponentFixture<TextFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TextFieldComponent, TextInputComponent, ErrorMessagePipe],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
