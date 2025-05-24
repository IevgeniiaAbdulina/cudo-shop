import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './core/auth/auth.service';
import { StorageService } from './core/auth/storage.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  public title = 'cudo-shop';

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
  ) {}

  public ngOnInit() {
    if (!this.storageService.isAuthorisedSession()) {
      if (this.storageService.isAccessTokenExpiredOnly()) {
        this.authService.refreshToken().subscribe();
      } else {
        this.authService.auth().subscribe();
      }
    }
  }
}
