export interface UserResponse {
  id: string;
  version: number;
  versionModifiedAt: string;
  lastMessageSequenceNumber: number;
  createdAt: string;
  lastModifiedAt: string;
  lastModifiedBy: LastModifiedBy;
  createdBy: CreatedBy;
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  password: string;
  addresses: Address[];
  defaultShippingAddressId: string;
  defaultBillingAddressId: string;
  shippingAddressIds: string[];
  billingAddressIds: string[];
  isEmailVerified: boolean;
  customerGroupAssignments: CustomerGroupAssignments[];
  stores: Stores[];
  authenticationMode: string;
}

export interface LastModifiedBy {
  clientId: string;
  isPlatformClient: boolean;
}

export interface CreatedBy {
  clientId: string;
  isPlatformClient: boolean;
}

export interface Address {
  id: string;
  streetName: string;
  postalCode: string;
  city: string;
  country: string;
}

export type CustomerGroupAssignments = Record<string, string>;
export type Stores = Record<string, string>;
