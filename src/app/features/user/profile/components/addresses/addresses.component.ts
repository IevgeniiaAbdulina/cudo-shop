import { Component, signal, WritableSignal, OnInit } from '@angular/core';
import { ButtonComponent } from '../../../../../shared/ui/button/button.component';
import { FormatCountryPipe } from '../../../pipes/format-country.pipe';
import { NgClass, NgForOf, NgIf, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { UserModel } from '../../../model/user-model';
import { Address, UserResponse } from '../../../interfaces/user-response';
import { UserService } from '../../../services/user.service';
import { EditModeModalComponent } from '../edit-mode-modal/edit-mode-modal.component';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NAME_REGEX } from '../../../../../shared/constants/regex';
import { postalCodeValidator } from '../../../../../shared/validator/validate.postal-code';
import ERROR_MSG from '../../../../../shared/constants/error-message';
import { ControlService } from '../../../services/control.service';
import { EDIT_MODE_MSG } from '../../enums/edit-mode-messages';

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
    NgClass,
    NgIf,
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

  public showResponseMessage: boolean = false;
  public isAddAddressSuccess: boolean = false;
  public isModalVisible: boolean = false;
  public validCountries: string[] = ['Poland', 'Germany', 'USA'];

  public newShoppingAddressForm: FormGroup;
  protected readonly ERROR_MSG = ERROR_MSG;
  protected readonly EDIT_MODE_MSG = EDIT_MODE_MSG;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
  ) {
    this.newShoppingAddressForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      streetName: [''],
      postalCode: [''],
      city: [''],
      country: [''],
    });
  }

  public ngOnInit(): void {
    this.userService.getUserPersonalInfoByToken().subscribe({
      next: (response: UserResponse) => {
        this.updateUserdata(response);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  private updateUserdata(response: UserResponse): void {
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
  }

  private setNewAddressForm(): void {
    this.newShoppingAddressForm = this.fb.group({
      firstName: [this.user()?.firstName, [Validators.required, Validators.pattern(NAME_REGEX)]],
      lastName: [this.user()?.lastName, [Validators.required, Validators.pattern(NAME_REGEX)]],
      streetName: ['', Validators.required],
      postalCode: ['', [Validators.required, postalCodeValidator()]],
      city: ['', [Validators.required, Validators.pattern(NAME_REGEX)]],
      country: ['', Validators.required],
    });

    this.newShoppingAddressForm.get('country')?.valueChanges.subscribe(() => {
      this.newShoppingAddressForm.get('postalCode')?.updateValueAndValidity();
    });
  }

  private handleResponseMessage(): void {
    this.showResponseMessage = true;
    setTimeout(() => {
      this.showResponseMessage = false;
    }, 3500);
  }

  // Add New Shipping Address
  public modeToggle(): void {
    this.isModalVisible = !this.isModalVisible;
  }

  public openModalShippingAddress(): void {
    this.setNewAddressForm();
    this.modeToggle();
  }

  public closeNewShippingAddressModal(): void {
    this.newShoppingAddressForm.reset();
    this.modeToggle();
  }

  public onFormSubmit(): void {
    if (this.newShoppingAddressForm.valid) {
      console.log('[shipping address] create new shipping address, form is valid: ', this.newShoppingAddressForm.value);
      this.userService.addAddress(this.user()!.id, this.user()!.version, this.newShoppingAddressForm.value).subscribe({
        next: (response: UserResponse) => {
          console.log('[shipping address] add address, response: ', response);

          const address = this.userService.findAddressByKey(response.addresses);

          console.log('[shipping address] new address with key: ', address);

          this.userService.setShippingAddress(this.user()!.id, response.version, address?.id).subscribe({
            next: (response: UserResponse) => {
              console.log('[shipping address] set address as a shipping, response: ', response);

              this.updateUserdata(response);
              this.isAddAddressSuccess = true;
              this.handleResponseMessage();
              this.closeNewShippingAddressModal();
            },
            error: (error) => {
              console.error(error);
              this.isAddAddressSuccess = false;
              this.handleResponseMessage();
              this.closeNewShippingAddressModal();
            },
          });
        },
        error: (error) => {
          console.error(error);
          this.isAddAddressSuccess = false;
          this.handleResponseMessage();
          this.closeNewShippingAddressModal();
        },
      });
    } else {
      console.log('[shipping address] form is invalid');
    }
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

  public validationCheck(control: AbstractControl): boolean | null {
    return ControlService.validationChecks(control);
  }

  public getShippingAddressControlName(controlName: string): AbstractControl | null {
    return ControlService.getFormControl(this.newShoppingAddressForm, controlName);
  }
}
