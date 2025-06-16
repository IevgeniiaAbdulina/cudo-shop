import { Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-promotion-teaser',
  imports: [],
  templateUrl: './promotion-teaser.component.html',
  styleUrl: './promotion-teaser.component.scss',
})
export class PromotionTeaserComponent {
  public customClass: InputSignal<string> = input<string>('');
}
