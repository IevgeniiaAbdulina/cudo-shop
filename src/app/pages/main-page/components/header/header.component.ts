import { Component } from '@angular/core';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-header',
  imports: [ButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  public isLogin = false;
  protected buttonClickedLogIn() {
    console.log('click Login');
  }
  protected buttonClickedLogOut() {
    console.log('click Logout');
  }
  protected buttonClickedRegister() {
    console.log('click Register');
  }
  protected buttonClickedCart() {
    console.log('click Cart');
  }
}
