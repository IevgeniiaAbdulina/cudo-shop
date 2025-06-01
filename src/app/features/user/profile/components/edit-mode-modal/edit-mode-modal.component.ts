import { Component, input, InputSignal } from '@angular/core';
import { NgIf } from '@angular/common';
import { ButtonComponent } from '../../../../../shared/ui/button/button.component';

@Component({
  selector: 'app-edit-mode-modal',
  imports: [NgIf, ButtonComponent],
  templateUrl: './edit-mode-modal.component.html',
  styleUrl: './edit-mode-modal.component.scss',
})
export class EditModeModalComponent {
  public isVisible: InputSignal<boolean> = input<boolean>(false);
}
