import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { SortByPriceComponent } from './sort-by-price.component';

describe('SortByPriceComponent', () => {
  let component: SortByPriceComponent;
  let fixture: ComponentFixture<SortByPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SortByPriceComponent],
      providers: [provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(SortByPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
