import { Component, signal, WritableSignal, OnInit } from '@angular/core';
import { ButtonComponent } from '../../../../../shared/ui/button/button.component';
import { FormatCountryPipe } from '../../../pipes/format-country.pipe';
import { NgForOf, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { UserModel } from '../../../model/user-model';
import { Address, UserResponse } from '../../../interfaces/user-response';
import { UserService } from '../../../services/user.service';
import { EditModeModalComponent } from '../edit-mode-modal/edit-mode-modal.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-addresses',
  imports: [
    ButtonComponent,
    FormatCountryPipe,
    TitleCasePipe,
    UpperCasePipe,
    EditModeModalComponent,
    FormsModule,
    ReactiveFormsModule,
    NgForOf,
  ],
  templateUrl: './addresses.component.html',
  styleUrl: './addresses.component.scss',
})
export class AddressesComponent implements OnInit {
  public user: WritableSignal<UserModel | null> = signal<UserModel | null>(null);

  public defaultBillingAddress?: Address;
  public defaultShippingAddress?: Address;
  public billingAddresses?: Address[];
  public shippingAddresses?: Address[];

  public isModalVisible: boolean = false;
  public validCountries: string[] = ['Poland', 'Germany', 'USA'];

  public newShoppingAddressGroup: FormGroup;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
  ) {
    this.newShoppingAddressGroup = this.fb.group({
      firstName: [''],
      lastName: [''],
      street: [''],
      postalCode: [''],
      city: [''],
      country: [''],
    });
  }

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

  // Add New Shipping Address
  public editModeToggle(): void {
    this.isModalVisible = !this.isModalVisible;
  }

  public openModalShippingAddress(): void {
    this.editModeToggle();
  }

  public closeNewShippingAddressModal(): void {
    this.editModeToggle();
  }

  public onFormSubmit(): void {
    console.log('[shipping address] create new shipping address');
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
