import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CosmeticsPageComponent } from './cosmetics-page.component';

describe('CosmeticsPageComponent', () => {
  let component: CosmeticsPageComponent;
  let fixture: ComponentFixture<CosmeticsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CosmeticsPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CosmeticsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
