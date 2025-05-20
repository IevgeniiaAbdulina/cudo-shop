import { Component, output } from '@angular/core';
import { ButtonComponent } from '../../../../shared/ui/button/button.component';

@Component({
  selector: 'app-header',
  imports: [ButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  public isLogin = false;
  public buttonClickedLogIn = output();
  public buttonClickedLogOut = output();
  protected buttonClickedRegister = output();
  protected buttonClickedCart = output();
  public buttonClickedGoToHome = output();
}
