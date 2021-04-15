import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestionsFriendComponent } from './suggestions-friend.component';

describe('SuggestionsFriendComponent', () => {
  let component: SuggestionsFriendComponent;
  let fixture: ComponentFixture<SuggestionsFriendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuggestionsFriendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestionsFriendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
