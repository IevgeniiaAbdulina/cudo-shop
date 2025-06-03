import { TestBed } from '@angular/core/testing';

import { ProductDetailedService } from './product-detailed.service';

describe('ProductDetailedService', () => {
  let service: ProductDetailedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductDetailedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
