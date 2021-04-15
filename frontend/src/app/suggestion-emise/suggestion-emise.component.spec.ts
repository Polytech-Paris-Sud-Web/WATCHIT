import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestionEmiseComponent } from './suggestion-emise.component';

describe('SuggestionEmiseComponent', () => {
  let component: SuggestionEmiseComponent;
  let fixture: ComponentFixture<SuggestionEmiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuggestionEmiseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestionEmiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
