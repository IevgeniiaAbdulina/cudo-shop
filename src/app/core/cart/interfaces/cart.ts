import { CartItem } from './cart-item';

export interface Cart {
  id: string;
  version: number;
  lineItems: CartItem[];
}
