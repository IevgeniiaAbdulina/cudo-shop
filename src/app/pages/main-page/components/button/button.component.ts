import { Component, input, output } from '@angular/core';

@Component({
  selector: "app-button",
  imports: [],
  template: `
  <button (click)="buttonClicked.emit()">
    {{label() }}
  </button>`,
  styleUrl: "./button.component.scss"
})
export class ButtonComponent {
  public label = input("");
  protected buttonClicked = output();
}
