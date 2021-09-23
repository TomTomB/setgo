import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkPrimaryComponent } from './link-primary.component';

describe('LinkPrimaryComponent', () => {
  let component: LinkPrimaryComponent;
  let fixture: ComponentFixture<LinkPrimaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LinkPrimaryComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkPrimaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
