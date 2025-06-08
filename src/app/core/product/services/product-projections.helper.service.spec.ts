import { TestBed } from '@angular/core/testing';

import { ProductProjectionsHelperService } from './product-projections.helper.service';

describe('ProductProjectionsHelperService', () => {
  let service: ProductProjectionsHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductProjectionsHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
