import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageFriendSuggestionComponent } from './page-friend-suggestion.component';

describe('PageFriendSuggestionComponent', () => {
  let component: PageFriendSuggestionComponent;
  let fixture: ComponentFixture<PageFriendSuggestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageFriendSuggestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageFriendSuggestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
