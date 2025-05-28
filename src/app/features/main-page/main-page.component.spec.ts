import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter, Router } from '@angular/router';
import { routes } from '../../app.routes';

import { MainPageComponent } from './main-page.component';

describe('MainPageComponent', () => {
  let component: MainPageComponent;
  let fixture: ComponentFixture<MainPageComponent>;
  let router: Router;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainPageComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter(routes)],
    }).compileComponents();

    fixture = TestBed.createComponent(MainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to login page', () => {
    const navigateSpy = jest.spyOn(component, 'goToLogInPage');
    component.goToLogInPage();
    expect(navigateSpy).toHaveBeenCalled();
  });

  it('should navigate to register page', () => {
    const navigateSpy = jest.spyOn(component, 'goToRegisterPage');
    component.goToRegisterPage();
    expect(navigateSpy).toHaveBeenCalled();
  });

  it('should navigate to cart page', () => {
    const navigateSpy = jest.spyOn(component, 'goToCart');
    component.goToCart();
    expect(navigateSpy).toHaveBeenCalled();
  });
});
