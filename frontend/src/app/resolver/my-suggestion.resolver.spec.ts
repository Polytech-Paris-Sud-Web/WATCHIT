import { TestBed } from '@angular/core/testing';

import { MySuggestionResolver } from './my-suggestion.resolver';

describe('MySuggestionResolver', () => {
  let resolver: MySuggestionResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(MySuggestionResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
