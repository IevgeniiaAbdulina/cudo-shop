import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';

import { ProductProjectionsApiService } from './product-projections.api.service';

describe('ProductProjectionsApiService', () => {
  let service: ProductProjectionsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()],
    });
    service = TestBed.inject(ProductProjectionsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
