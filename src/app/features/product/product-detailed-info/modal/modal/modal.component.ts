import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonComponent } from '../../../../../shared/ui/button/button.component';
//import { ProductImage } from '../../../../../core/product/interfaces/product-image';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  imports: [CommonModule, ButtonComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  @Input() public isModalOpen: boolean = false;
  //@Input() public images: ProductImage[] = [];
  @Input() public currentIndex: number = 0;
  @Input() public src: string = '';
  @Input() public alt: string = '';

  @Output() public closeModalWindow = new EventEmitter<void>();

  public openModal(index: number): void {
    this.isModalOpen = true;
    this.currentIndex = index;
  }

  public closeModal(): void {
    this.isModalOpen = false;
    this.closeModalWindow.emit();
  }

  public onClickLeft() {}
  public onClickRight() {}
}
