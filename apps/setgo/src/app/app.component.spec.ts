import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreTestingModule } from '@setgo/store/testing';
import { TestBed } from '@angular/core/testing';
import { UikitCommonModule } from '@setgo/uikit/common';
import { UikitFormsModule } from '@setgo/uikit/forms';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        RouterTestingModule,
        UikitCommonModule,
        UikitFormsModule,
        StoreTestingModule,
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
