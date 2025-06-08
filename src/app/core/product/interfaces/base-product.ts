export interface BaseProduct {
  id: string;
  version: number;
  productType: Record<string, string>;
  key: string;
}
