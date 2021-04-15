import { TestBed } from '@angular/core/testing';

import { OfflineAppService } from './offline-app.service';

describe('OfflineAppService', () => {
  let service: OfflineAppService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OfflineAppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
