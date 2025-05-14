import { Component } from "@angular/core";
import { ButtonComponent } from "../button/button.component";

@Component({
  selector: "app-header",
  imports: [ButtonComponent],
  template: ` <div class="header">
    <div>
      <a href="#"> Cudo-shop </a>
    </div>
    <div>search</div>
    <div>
      <app-button label="Sign In" (buttonClicked)="buttonClickedSignIn()" />
      <app-button label="Sign Up" (buttonClicked)="buttonClickedSignUp()" />
    </div>
  </div>`,
  styleUrl: "./header.component.scss",
})
export class HeaderComponent {
  protected buttonClickedSignIn() {
    console.log("click Sign In");
  }
  protected buttonClickedSignUp(){
    console.log("click Sign Up");
  }
}
