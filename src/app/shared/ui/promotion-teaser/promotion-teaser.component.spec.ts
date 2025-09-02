import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionTeaserComponent } from './promotion-teaser.component';

describe('PromotionTeaserComponent', () => {
  let component: PromotionTeaserComponent;
  let fixture: ComponentFixture<PromotionTeaserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromotionTeaserComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PromotionTeaserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
