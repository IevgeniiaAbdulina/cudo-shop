import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-brief-card',
  imports: [],
  templateUrl: './brief-card.component.html',
  styleUrl: './brief-card.component.scss',
})
export class BriefCardComponent {
  @Input() description!: string; // eslint-disable-line @typescript-eslint/explicit-member-accessibility
  @Input() imgUrl!: string; // eslint-disable-line @typescript-eslint/explicit-member-accessibility
  @Input() title!: string; // eslint-disable-line @typescript-eslint/explicit-member-accessibility
}
