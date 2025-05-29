import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { LoginComponent } from './login.component';
import { provideRouter } from '@angular/router';
import { routes } from '../../../app.routes';
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter(routes)],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('togglePasswordVisibility', () => {
    it('should toggle password field', () => {
      expect(component.passwordFieldType).toBe('password');
      expect(component.isPasswordVisible).toBeFalsy();
      component.togglePasswordVisibility();
      expect(component.passwordFieldType).toBeTruthy();
      expect(component.passwordFieldType).toBe('text');
    });
  });
});
