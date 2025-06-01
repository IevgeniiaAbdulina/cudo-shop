import { Component, input, InputSignal, output } from '@angular/core';
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
  public closeModalWindow = output();

  public closeModal(event: Event): void {
    const target = event.target as HTMLInputElement;

    if (target.classList.contains('modal')) {
      this.closeModalWindow.emit();
    }
  }
}
