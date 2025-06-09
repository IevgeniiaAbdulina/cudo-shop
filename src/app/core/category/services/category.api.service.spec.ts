import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';

import { CategoryApiService } from './category.api.service';

describe('CategoryApiService', () => {
  let service: CategoryApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()],
    });
    service = TestBed.inject(CategoryApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
