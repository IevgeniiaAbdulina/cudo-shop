import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CosmeticsDetailsComponent } from './cosmetics-details.component';

describe('CosmeticsDetailsComponent', () => {
  let component: CosmeticsDetailsComponent;
  let fixture: ComponentFixture<CosmeticsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CosmeticsDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CosmeticsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
