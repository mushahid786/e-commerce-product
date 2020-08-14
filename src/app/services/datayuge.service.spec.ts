import { TestBed } from '@angular/core/testing';

import { DatayugeService } from './datayuge.service';

describe('DatayugeService', () => {
  let service: DatayugeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatayugeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
