import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { NgOptimizedImage } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DialogTeamMemberInfoComponent } from './components/dialog-team-member-info/dialog-team-member-info.component';
import { AlenaInfo } from './members-info/alena-info';
import { IevgeniiaInfo } from './members-info/ievgeniia-info';
import { VolhaInfo } from './members-info/Volha-info';
import { TeamMemberInfo, TeamMembers } from './interfaces/team-members';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-about-us',
  imports: [MatCardModule, MatButton, NgOptimizedImage, MatIcon, MatTooltip],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss',
})
export class AboutUsComponent {
  public dialog = inject(MatDialog);

  public technology = [
    { name: 'Angular' },
    { name: 'TypeScript' },
    { name: 'Sass' },
    { name: 'Jest' },
    { name: 'Postman' },
    { name: 'Npm' },
    { name: 'Webpack' },
    { name: 'Git' },
    { name: 'GitHub' },
    { name: 'VSCode' },
    { name: 'WebStorm' },
    { name: 'Commercetools' },
  ];

  public collaboration = [{ name: 'GitHub' }, { name: 'Diagrams' }, { name: 'Discord' }, { name: 'Telegram' }];

  public teamMembers: TeamMembers = [AlenaInfo, IevgeniiaInfo, VolhaInfo];

  public developmentLifeCycle: {
    title: string;
    td1: string;
    td2: string;
    img: string;
  }[] = [
    {
      title: 'Design & Mockups',
      td1: 'Create wireframes and prototypes using draw.io.',
      td2: 'Discuss UX/UI decisions with the team before implementation.',
      img: 'layout',
    },
    {
      title: 'Development',
      td1: 'Work in "two-week sprints" using Scrum.',
      td2: 'Follow "feature branches" in GitHub, with PR reviews before merging.',
      img: 'coding',
    },
    {
      title: 'Bugfix & Testing',
      td1: 'Automated unit tests + manual testing.',
      td2: 'Bug tracking via GitHub Issues.',
      img: 'bug',
    },
  ];

  public openDialog(member: TeamMemberInfo): void {
    this.dialog.open(DialogTeamMemberInfoComponent, {
      data: {
        member,
      },
    });
  }
}
