import { TestBed } from '@angular/core/testing';

import { SentSuggestionResolver } from './sent-suggestion.resolver';

describe('SentSuggestionResolver', () => {
  let resolver: SentSuggestionResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(SentSuggestionResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
