import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonComponent } from '../../../../../shared/ui/button/button.component';
import { ProductImage } from '../../../../../core/product/interfaces/product-image';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  imports: [CommonModule, ButtonComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  @Input() public isModalOpen: boolean = false;
  @Input() public images: ProductImage[] = [];
  @Input() public currentIndex: number = 0;
  @Input() public src: string = '';
  @Input() public alt: string = '';

  @Output() public closeModalWindow = new EventEmitter<number>();

  public openModal(index: number): void {
    this.isModalOpen = true;
    this.currentIndex = index;
  }

  public onClickLeft() {
    if (this.images.length > 0) {
      this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    }
  }
  public onClickRight() {
    if (this.images.length > 0) {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    }
  }

  public getCurrentImage(): ProductImage | null {
    if (this.images.length > 0 && this.currentIndex >= 0 && this.currentIndex <= this.images.length) {
      return this.images[this.currentIndex];
    }

    return null;
  }

  public closeModal(): void {
    this.closeModalWindow.emit(this.currentIndex);
  }
}
