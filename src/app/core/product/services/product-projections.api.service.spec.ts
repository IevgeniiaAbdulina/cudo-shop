import { TestBed } from '@angular/core/testing';

import { ProductProjectionsApiService } from './product-projections.api.service';

describe('ProductProjectionsApiService', () => {
  let service: ProductProjectionsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductProjectionsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
