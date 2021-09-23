import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { UikitCommonModule } from '@setgo/uikit/common';
import { UikitFormsModule } from '@setgo/uikit/forms';

import { IdentifierTemplateComponent } from './identifier.component';

describe('IdentifierTemplateComponent', () => {
  let component: IdentifierTemplateComponent;
  let fixture: ComponentFixture<IdentifierTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IdentifierTemplateComponent],
      imports: [UikitCommonModule, UikitFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentifierTemplateComponent);
    component = fixture.componentInstance;
    component.emailControl = new FormControl();
    component.emailForm = new FormGroup({ email: new FormControl() });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
