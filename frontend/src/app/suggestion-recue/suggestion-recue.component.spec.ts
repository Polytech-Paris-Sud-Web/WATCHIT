import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestionRecueComponent } from './suggestion-recue.component';

describe('SuggestionRecueComponent', () => {
  let component: SuggestionRecueComponent;
  let fixture: ComponentFixture<SuggestionRecueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuggestionRecueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestionRecueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
