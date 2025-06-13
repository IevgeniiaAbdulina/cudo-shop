export interface CartResponse {
  type: string;
  id: string;
  version: number;
  versionModifiedAt: string;
  lastMessageSequenceNumber: number;
  createdAt: string;
  lastModifiedAt: string;
  lastModifiedBy: LastModifiedBy;
  createdBy: CreatedBy;
  lineItems: CartItemResponse[];
  cartState: string;
  totalPrice: TotalPrice;
  shippingMode: string;
  shipping: ArrayTypeCombination[];
  customLineItems: ArrayTypeCombination[];
  discountCodes: ArrayTypeCombination[];
  directDiscounts: ArrayTypeCombination[];
  inventoryMode: string;
  priceRoundingMode: string;
  taxMode: string;
  taxRoundingMode: string;
  taxCalculationMode: string;
  deleteDaysAfterLastModification: number;
  refusedGifts: ArrayTypeCombination[];
  origin: string;
  itemShippingAddresses: ArrayTypeCombination[];
  discountTypeCombination: DiscountTypeCombination;
  totalLineItemQuantity: number;
}

export interface LastModifiedBy {
  clientId: string;
  isPlatformClient: boolean;
}

export interface CreatedBy {
  clientId: string;
  isPlatformClient: boolean;
}

export interface TotalPrice {
  type: string;
  currencyCode: string;
  centAmount: number;
  fractionDigits: number;
}

export interface DiscountTypeCombination {
  type: string;
}

export type ArrayTypeCombination = Record<string, string>;

/* Product */
export interface CartItemResponse {
  id: string;
  productId: string;
  productKey: string;
  name: Name;
  productType: ProductType;
  productSlug: ProductSlug;
  variant: Variant;
  price: Price2;
  quantity: number;
  discountedPricePerQuantity: ArrayTypeCombination[];
  perMethodTaxRate: ArrayTypeCombination[];
  addedAt: string;
  lastModifiedAt: string;
  state: State[];
  priceMode: string;
  lineItemMode: string;
  totalPrice: TotalPrice;
  taxedPricePortions: ArrayTypeCombination[];
}

export interface Name {
  'de-DE': string;
  'en-US': string;
  'pl-PL': string;
}

export interface ProductType {
  typeId: string;
  id: string;
  version: number;
}

export interface ProductSlug {
  'de-DE': string;
  'en-US': string;
  'pl-PL': string;
}

export interface Variant {
  id: number;
  sku: string;
  key: string;
  prices: Price[];
  images: Image[];
  attributes: Attribute[];
  assets: ArrayTypeCombination[];
  availability: Availability;
}

export interface Price {
  id: string;
  value: Value;
  validUntil: string;
  discounted: Discounted;
  country?: string;
}

export interface Value {
  type: string;
  currencyCode: string;
  centAmount: number;
  fractionDigits: number;
}

export interface Discounted {
  value: Value2;
  discount: Discount;
}

export interface Value2 {
  type: string;
  currencyCode: string;
  centAmount: number;
  fractionDigits: number;
}

export interface Discount {
  typeId: string;
  id: string;
}

export interface Image {
  url: string;
  label: string;
  dimensions: Dimensions;
}

export interface Dimensions {
  w: number;
  h: number;
}

export interface Attribute {
  name: string;
  value: string[];
}

export interface Availability {
  isOnStock: boolean;
  availableQuantity: number;
  version: number;
  id: string;
}

export interface Price2 {
  id: string;
  value: Value3;
  validUntil: string;
  discounted?: Discounted2;
}

export interface Value3 {
  type: string;
  currencyCode: string;
  centAmount: number;
  fractionDigits: number;
}

export interface Discounted2 {
  value: Value4;
  discount: Discount2;
}

export interface Value4 {
  type: string;
  currencyCode: string;
  centAmount: number;
  fractionDigits: number;
}

export interface Discount2 {
  typeId: string;
  id: string;
}

export interface State {
  quantity: number;
  state: State2;
}

export interface State2 {
  typeId: string;
  id: string;
}

export interface TotalPrice {
  type: string;
  currencyCode: string;
  centAmount: number;
  fractionDigits: number;
}
