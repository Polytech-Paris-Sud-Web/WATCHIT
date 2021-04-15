import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestionFriendComponent } from './suggestion-friend.component';

describe('SuggestionFriendComponent', () => {
  let component: SuggestionFriendComponent;
  let fixture: ComponentFixture<SuggestionFriendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuggestionFriendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestionFriendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
