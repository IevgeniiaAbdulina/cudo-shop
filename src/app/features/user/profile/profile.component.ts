import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { UserModel } from '../model/user-model';
import { Address, UserResponse } from '../interfaces/user-response';
import { DatePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [UpperCasePipe, TitleCasePipe, DatePipe],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  public user?: UserModel;
  public defaultBillingAddress?: Address;
  public defaultShippingAddress?: Address;
  public billingAddresses?: Address[];
  public shippingAddresses?: Address[];

  constructor(private userService: UserService) {}

  public ngOnInit(): void {
    this.userService.getUserPersonalInfoByToken().subscribe({
      next: (response: UserResponse) => {
        console.log('[user profile page] response data: ', response);

        this.user = new UserModel(
          response.id,
          response.email,
          response.firstName,
          response.lastName,
          response.dateOfBirth,
          response.password,
          response.addresses,
        );

        this.getAddresses();
        this.defaultBillingAddress = this.findDefaultBillingAddress(response);
        this.defaultShippingAddress = this.findDefaultShippingAddress(response);
        this.billingAddresses = this.findBillingAddresses(response);
        this.shippingAddresses = this.findShippingAddresses(response);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  public getAddresses(): void {
    this.user?.addresses.map((address: Address) => {
      console.log('[user profile page] addresses: ', address);
    });
  }

  public findDefaultBillingAddress(response: UserResponse): Address | undefined {
    return this.user?.addresses.find((address: Address) => response.defaultBillingAddressId === address.id);
  }

  public findDefaultShippingAddress(response: UserResponse): Address | undefined {
    return this.user?.addresses.find((address: Address) => response.defaultShippingAddressId === address.id);
  }

  public findBillingAddresses(response: UserResponse): Address[] | undefined {
    const addresses: Address[] = [];
    response.billingAddressIds.forEach((addressId: string) => {
      this.user?.addresses.forEach((address: Address) => {
        if (address.id === addressId) {
          addresses?.push(address);
        }
      });
    });

    return addresses;
  }

  public findShippingAddresses(response: UserResponse): Address[] | undefined {
    const addresses: Address[] = [];
    response.shippingAddressIds.forEach((addressId: string) => {
      this.user?.addresses.forEach((address: Address) => {
        if (address.id === addressId) {
          addresses?.push(address);
        }
      });
    });

    return addresses;
  }
}
