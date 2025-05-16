import { Component } from '@angular/core';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-header',
  imports: [ButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  protected buttonClickedSignIn() {
    console.log('click Sign In');
  }
  protected buttonClickedSignUp() {
    console.log('click Sign Up');
  }
  public isLogin = false;
}
