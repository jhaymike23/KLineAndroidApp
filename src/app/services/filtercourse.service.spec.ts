import { TestBed } from '@angular/core/testing';

import { FiltercourseService } from './filtercourse.service';

describe('FiltercourseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FiltercourseService = TestBed.get(FiltercourseService);
    expect(service).toBeTruthy();
  });
});
