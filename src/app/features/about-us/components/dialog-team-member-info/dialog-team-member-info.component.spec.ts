import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTeamMemberInfoComponent } from './dialog-team-member-info.component';

describe('DialogTeamMemberInfoComponent', () => {
  let component: DialogTeamMemberInfoComponent;
  let fixture: ComponentFixture<DialogTeamMemberInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogTeamMemberInfoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DialogTeamMemberInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
