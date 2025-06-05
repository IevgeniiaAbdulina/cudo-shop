import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { routes } from '../../../app.routes';

import { ProductDetailedInfoComponent } from './product-detailed-info.component';

describe('ProductDetailedInfoComponent', () => {
  let component: ProductDetailedInfoComponent;
  let fixture: ComponentFixture<ProductDetailedInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDetailedInfoComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter(routes)]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDetailedInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
