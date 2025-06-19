import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { TeamMemberInfo } from '../../interfaces/team-members';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-dialog-team-member-info',
  imports: [MatDialogModule, MatButtonModule, MatDivider, MatIcon],
  templateUrl: './dialog-team-member-info.component.html',
  styleUrl: './dialog-team-member-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogTeamMemberInfoComponent {
  public data: { member: TeamMemberInfo } = inject(MAT_DIALOG_DATA);
}
