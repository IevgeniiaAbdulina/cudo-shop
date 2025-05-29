import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BriefCardComponent } from './brief-card.component';

describe('BriefCardComponent', () => {
  let component: BriefCardComponent;
  let fixture: ComponentFixture<BriefCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BriefCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BriefCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
