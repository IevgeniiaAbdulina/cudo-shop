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

  public modalHeader: string = '';
  public isShippingAddress: boolean = true;
  public isEditAddress: boolean = false;
  public showResponseShippingMessage: boolean = false;
  public showResponseBillingMessage: boolean = false;
  public isAddAddressSuccess: boolean = false;
  public isAddBillingAddressSuccess: boolean = false;
  public isModalVisible: boolean = false;
  public validCountries: string[] = ['Poland', 'Germany', 'USA'];
  public addressId: string = '';

  public addressForm: FormGroup;
  protected readonly ERROR_MSG = ERROR_MSG;
  protected readonly EDIT_MODE_MSG = EDIT_MODE_MSG;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
  ) {
    this.addressForm = this.fb.group({
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
    this.addressForm = this.fb.group({
      firstName: [this.user()?.firstName, [Validators.required, Validators.pattern(NAME_REGEX)]],
      lastName: [this.user()?.lastName, [Validators.required, Validators.pattern(NAME_REGEX)]],
      streetName: ['', Validators.required],
      postalCode: ['', [Validators.required, postalCodeValidator()]],
      city: ['', [Validators.required, Validators.pattern(NAME_REGEX)]],
      country: ['', Validators.required],
    });

    this.addressForm.get('country')?.valueChanges.subscribe(() => {
      this.addressForm.get('postalCode')?.updateValueAndValidity();
    });
  }

  private handleResponseMessage(addressType: string): void {
    if (addressType === 'billing') {
      this.showResponseBillingMessage = true;
      setTimeout(() => {
        this.showResponseBillingMessage = false;
      }, 3500);
    }
    if (addressType === 'shipping') {
      this.showResponseShippingMessage = true;
      setTimeout(() => {
        this.showResponseShippingMessage = false;
      }, 3500);
    }
  }

  public onRemoveClick(addressId: string): void {
    this.userService.removeAddress(this.user()!.id, this.user()!.version, addressId).subscribe({
      next: (response) => {
        this.updateUserdata(response);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  public onSubmitDefaultShippingAddress(addressId: string): void {
    if (addressId) {
      this.userService.setDefaultShippingAddress(this.user()!.id, this.user()!.version, addressId).subscribe({
        next: (response: UserResponse) => {
          this.updateUserdata(response);
        },
        error: (error) => {
          console.error(error);
        },
      });
    }
  }

  public onSubmitDefaultBillingAddress(addressId: string): void {
    if (addressId) {
      this.userService.setDefaultBillingAddress(this.user()!.id, this.user()!.version, addressId).subscribe({
        next: (response: UserResponse) => {
          this.updateUserdata(response);
        },
        error: (error) => {
          console.error(error);
        },
      });
    }
  }

  public setAddressForm(addressData: Address): void {
    this.addressForm = this.fb.group({
      firstName: [this.user()?.firstName, [Validators.required, Validators.pattern(NAME_REGEX)]],
      lastName: [this.user()?.lastName, [Validators.required, Validators.pattern(NAME_REGEX)]],
      streetName: [addressData.streetName, Validators.required],
      postalCode: [addressData.postalCode, [Validators.required, postalCodeValidator()]],
      city: [addressData.city, [Validators.required, Validators.pattern(NAME_REGEX)]],
      country: ['', Validators.required],
    });

    this.addressForm.get('country')?.valueChanges.subscribe(() => {
      this.addressForm.get('postalCode')?.updateValueAndValidity();
    });
  }

  public openModalEditAddress(address: Address) {
    this.modalHeader = 'Edit your address';
    this.isEditAddress = true;
    this.addressId = address.id;
    this.setAddressForm(address);
    this.modeToggle();
  }

  public modeToggle(): void {
    this.isModalVisible = !this.isModalVisible;
  }

  public openModalShippingAddress(addressType: string): void {
    if (addressType === 'billing') {
      this.modalHeader = 'Add billing address';
      this.isShippingAddress = false;
    }
    if (addressType === 'shipping') {
      this.modalHeader = 'Add shipping address';
      this.isShippingAddress = true;
    }
    this.setNewAddressForm();
    this.modeToggle();
  }

  public closeNewShippingAddressModal(): void {
    this.addressForm.reset();
    this.modeToggle();
  }

  public onFormSubmit(): void {
    if (this.addressForm.valid) {
      if (this.isEditAddress) {
        this.userService.changeAddress(this.user()!.id, this.user()!.version, this.addressId, this.addressForm.value).subscribe({
          next: (response: UserResponse) => {
            this.updateUserdata(response);
            this.closeNewShippingAddressModal();
          },
          error: (error) => {
            console.error(error);
            this.closeNewShippingAddressModal();
          },
        });
      } else {
        this.userService.addAddress(this.user()!.id, this.user()!.version, this.addressForm.value).subscribe({
          next: (response: UserResponse) => {
            const address = this.userService.findAddressByKey(response.addresses);

            if (this.isShippingAddress) {
              this.userService.addShippingAddress(this.user()!.id, response.version, address?.id).subscribe({
                next: (response: UserResponse) => {
                  this.updateUserdata(response);
                  this.isAddAddressSuccess = true;
                  this.handleResponseMessage('shipping');
                  this.closeNewShippingAddressModal();
                },
                error: (error) => {
                  console.error(error);
                  this.isAddAddressSuccess = false;
                  this.handleResponseMessage('shipping');
                  this.closeNewShippingAddressModal();
                },
              });
            } else {
              this.userService.addBillingAddress(this.user()!.id, response.version, address?.id).subscribe({
                next: (response: UserResponse) => {
                  this.updateUserdata(response);
                  this.isAddBillingAddressSuccess = true;
                  this.handleResponseMessage('billing');
                  this.closeNewShippingAddressModal();
                },
                error: (error) => {
                  console.error(error);
                  this.isAddBillingAddressSuccess = false;
                  this.handleResponseMessage('billing');
                  this.closeNewShippingAddressModal();
                },
              });
            }
          },
          error: (error) => {
            console.error(error);
            this.isAddAddressSuccess = false;
            this.handleResponseMessage('billing');
            this.closeNewShippingAddressModal();
          },
        });
      }
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
    return ControlService.getFormControl(this.addressForm, controlName);
  }
}
