import { Component } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [TitleCasePipe, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  public navAccount = 'Personal info';
  public navAddresses = 'Addresses';
}
