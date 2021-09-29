import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdentifierViewComponent } from './identifier.component';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreTestingModule } from '@setgo/store/testing';
import { UikitCommonModule } from '@setgo/uikit/common';
import { UikitFormsModule } from '@setgo/uikit/forms';

describe('IdentifierViewComponent', () => {
  let component: IdentifierViewComponent;
  let fixture: ComponentFixture<IdentifierViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IdentifierViewComponent],
      imports: [
        StoreTestingModule,
        RouterTestingModule,
        UikitCommonModule,
        UikitFormsModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentifierViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
