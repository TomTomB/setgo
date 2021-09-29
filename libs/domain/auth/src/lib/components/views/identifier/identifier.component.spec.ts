import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdentifierComponent } from './identifier.component';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreTestingModule } from '@setgo/store/testing';
import { UikitCommonModule } from '@setgo/uikit/common';
import { UikitFormsModule } from '@setgo/uikit/forms';

describe('IdentifierComponent', () => {
  let component: IdentifierComponent;
  let fixture: ComponentFixture<IdentifierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IdentifierComponent],
      imports: [
        StoreTestingModule,
        RouterTestingModule,
        UikitCommonModule,
        UikitFormsModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
