import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() public label = '';
  @Output() public buttonClicked = new EventEmitter<void>();
  @Input() public disabled: boolean = false;
}
