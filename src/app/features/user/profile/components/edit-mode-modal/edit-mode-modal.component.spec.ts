import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditModeModalComponent } from './edit-mode-modal.component';

describe('EditModeModalComponent', () => {
  let component: EditModeModalComponent;
  let fixture: ComponentFixture<EditModeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditModeModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditModeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
