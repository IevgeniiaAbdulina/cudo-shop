import { Component, inject, output } from '@angular/core';
import { ButtonComponent } from '../../../../shared/ui/button/button.component';
import { AuthService } from '../../../../core/auth/auth.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [ButtonComponent, AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  public authService = inject(AuthService);
  public isLogin$ = this.authService.isAuthenticated$;

  public buttonClickedLogIn = output();
  public buttonClickedLogOut = output();
  protected buttonClickedRegister = output();
  protected buttonClickedCart = output();
  public buttonClickedGoToHome = output();
  public buttonClickedProfile = output();
  public buttonClickedBooks = output();
  public buttonClickedCosmetics = output(); 
}
