import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartStateService {
  private disabledProducts = new Set<string>();

  public isProductDisabled(productId: string): boolean {
    return this.disabledProducts.has(productId);
  }

  public disableProduct(productId: string): void {
    this.disabledProducts.add(productId);
  }
}
