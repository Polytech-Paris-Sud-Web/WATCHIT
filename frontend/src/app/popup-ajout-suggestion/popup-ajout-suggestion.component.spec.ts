import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupAjoutSuggestionComponent } from './popup-ajout-suggestion.component';

describe('PopupAjoutSuggestionComponent', () => {
  let component: PopupAjoutSuggestionComponent;
  let fixture: ComponentFixture<PopupAjoutSuggestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupAjoutSuggestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupAjoutSuggestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
