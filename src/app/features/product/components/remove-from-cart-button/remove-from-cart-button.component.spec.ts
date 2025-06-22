import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveFromCartButtonComponent } from './remove-from-cart-button.component';

describe('RemoveFromCartButtonComponent', () => {
  let component: RemoveFromCartButtonComponent;
  let fixture: ComponentFixture<RemoveFromCartButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemoveFromCartButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RemoveFromCartButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
