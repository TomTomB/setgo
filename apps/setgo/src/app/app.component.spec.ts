import { AppComponent } from './app.component';
import { DomainNotificationsModule } from '@setgo/domain/notifications';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreTestingModule } from '@setgo/store/testing';
import { TestBed } from '@angular/core/testing';
import { UikitCommonModule } from '@setgo/uikit/common';
import { UikitCoreModule } from '@setgo/uikit/core';
import { UikitFormsModule } from '@setgo/uikit/forms';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        DomainNotificationsModule,
        RouterTestingModule,
        StoreTestingModule,
        UikitCoreModule,
        UikitCommonModule,
        UikitFormsModule,
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
