import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';

import { SortByAlphabeticalComponent } from './sort-by-alphabetical.component';

describe('SortByAlphabeticalComponent', () => {
  let component: SortByAlphabeticalComponent;
  let fixture: ComponentFixture<SortByAlphabeticalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SortByAlphabeticalComponent],
      providers: [provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(SortByAlphabeticalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
