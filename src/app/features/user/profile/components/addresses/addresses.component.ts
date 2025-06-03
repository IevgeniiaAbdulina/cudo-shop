import { Component, signal, WritableSignal, OnInit } from '@angular/core';
import { ButtonComponent } from '../../../../../shared/ui/button/button.component';
import { FormatCountryPipe } from '../../../pipes/format-country.pipe';
import { TitleCasePipe, UpperCasePipe } from '@angular/common';
import { UserModel } from '../../../model/user-model';
import { Address, UserResponse } from '../../../interfaces/user-response';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-addresses',
  imports: [ButtonComponent, FormatCountryPipe, TitleCasePipe, UpperCasePipe],
  templateUrl: './addresses.component.html',
  styleUrl: './addresses.component.scss',
})
export class AddressesComponent implements OnInit {
  public user: WritableSignal<UserModel | null> = signal<UserModel | null>(null);

  public defaultBillingAddress?: Address;
  public defaultShippingAddress?: Address;
  public billingAddresses?: Address[];
  public shippingAddresses?: Address[];

  constructor(private userService: UserService) {}

  public ngOnInit(): void {
    this.userService.getUserPersonalInfoByToken().subscribe({
      next: (response: UserResponse) => {
        console.log('[user profile page] response data: ', response);

        this.user.set(
          new UserModel(
            response.version,
            response.id,
            response.email,
            response.firstName,
            response.lastName,
            response.dateOfBirth,
            response.password,
            response.addresses,
          ),
        );

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

  public findDefaultBillingAddress(response: UserResponse): Address | undefined {
    return this.user()?.addresses.find((address: Address) => response.defaultBillingAddressId === address.id);
  }

  public findDefaultShippingAddress(response: UserResponse): Address | undefined {
    return this.user()?.addresses.find((address: Address) => response.defaultShippingAddressId === address.id);
  }

  public findBillingAddresses(response: UserResponse): Address[] | undefined {
    const addresses: Address[] = [];
    response.billingAddressIds.forEach((addressId: string) => {
      this.user()?.addresses.forEach((address: Address) => {
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
      this.user()?.addresses.forEach((address: Address) => {
        if (address.id === addressId) {
          addresses?.push(address);
        }
      });
    });

    return addresses;
  }
}
