import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogCosmeticsComponent } from './catalog-cosmetics.component';

describe('CatalogCosmeticsComponent', () => {
  let component: CatalogCosmeticsComponent;
  let fixture: ComponentFixture<CatalogCosmeticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogCosmeticsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CatalogCosmeticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
