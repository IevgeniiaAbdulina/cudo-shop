export default interface Address {
  streetName: string;
  city: string;
  postalCode: string;
  country: string;
  isDefaultBillingAddress?: boolean;
  isDefaultShippingAddress?: boolean;
} // eslint-disable-line semi
