import { TestBed } from '@angular/core/testing';

import { RefreshSuggestionService } from './refresh-suggestion.service';

describe('RefreshSuggestionService', () => {
  let service: RefreshSuggestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RefreshSuggestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
