import { TestBed } from '@angular/core/testing';

import { CoursesdataService } from './coursesdata.service';

describe('CoursesdataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CoursesdataService = TestBed.get(CoursesdataService);
    expect(service).toBeTruthy();
  });
});
