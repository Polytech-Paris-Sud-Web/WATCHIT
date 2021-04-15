import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestionsEmisesComponent } from './suggestions-emises.component';

describe('SuggestionsEmisesComponent', () => {
  let component: SuggestionsEmisesComponent;
  let fixture: ComponentFixture<SuggestionsEmisesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuggestionsEmisesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestionsEmisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
