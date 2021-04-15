import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestionsRecuesComponent } from './suggestions-recues.component';

describe('SuggestionsRecuesComponent', () => {
  let component: SuggestionsRecuesComponent;
  let fixture: ComponentFixture<SuggestionsRecuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuggestionsRecuesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestionsRecuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
