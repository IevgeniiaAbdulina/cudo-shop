import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

type ClickHandler = (event?: MouseEvent) => void;

@Component({
  selector: 'app-product-button',
  imports: [CommonModule],
  templateUrl: './product-button.component.html',
  styleUrl: './product-button.component.scss',
})
export class ProductButtonComponent {
  @Input() public btnClass!: string;
  @Input() public text!: string;
  @Input() public clickBtn!: ClickHandler;

  @Input() public isDisabled: boolean = false;

  public handleClick(event?: MouseEvent): void {
    if (event && this.clickBtn) {
      this.clickBtn(event);
    } else if (!event && this.clickBtn) {
      this.clickBtn();
    }
  }
}
