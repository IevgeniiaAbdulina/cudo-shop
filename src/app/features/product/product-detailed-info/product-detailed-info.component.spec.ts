import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { routes } from '../../../app.routes';

import { ProductDetailedInfoComponent } from './product-detailed-info.component';
import { ProductDetailed } from './interfaces/product-detailed';

describe('ProductDetailedInfoComponent', () => {
  let component: ProductDetailedInfoComponent;
  let fixture: ComponentFixture<ProductDetailedInfoComponent>;

  const product: ProductDetailed = {
    id: 'id',
    key: 'key',
    masterData: {
      current: {
        name: {
          'en-US': 'product name',
        },
        categories: {
          typeId: 'typeID',
          id: 'categoryID',
        },
        description: {
          'en-US': 'description EN',
        },
        masterVariant: {
          sku: '123456789',
          key: '123456789',
          images: [{ label: 'label', url: 'image url' }],
          prices: [
            {
              discounted: {
                value: {
                  currencyCode: 'currencyCode',
                  centAmount: 260,
                },
              },
              value: {
                centAmount: 300,
                currencyCode: 'currency code',
              },
            },
          ],
        },
      },
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDetailedInfoComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter(routes)],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDetailedInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getProductName', () => {
    it('should return product name', () => {
      const name = component.getProductName(product);
      expect(name).toBe('product name');
    });
  });

  describe('getProductPrice', () => {
    it('should return product price', () => {
      const price = component.getProductPrice(product);
      expect(price).toEqual('3.00');
    });
  });

  describe('getProductDescription', () => {
    it('should return product description', () => {
      const description = component.getProductDescription(product);
      expect(description).toEqual('description EN');
    });
  });
  describe('getProductCurrency', () => {
    it('should return product currency', () => {
      const currency = component.getProductCurrency(product);
      expect(currency).toBe('currency code');
    });
  });
});
