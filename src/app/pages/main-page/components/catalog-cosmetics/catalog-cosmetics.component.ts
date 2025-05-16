import { Component, inject, Signal } from '@angular/core';
import { ROUTER_OUTLET_DATA } from '@angular/router';
import { Book } from '../../../../shared/interfaces/book';
import { Cosmetics } from '../../../../shared/interfaces/cosmetics';

@Component({
  selector: 'app-catalog-cosmetics',
  imports: [],
  templateUrl: './catalog-cosmetics.component.html',
  styleUrl: './catalog-cosmetics.component.scss',
})
export class CatalogCosmeticsComponent {
  private data = inject(ROUTER_OUTLET_DATA) as Signal<{
    books: Book[];
    cosmetics: Cosmetics[];
  }>;

  public cosmetics = this.data().cosmetics;
}
