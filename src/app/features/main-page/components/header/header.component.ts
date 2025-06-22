import { AsyncPipe } from '@angular/common';
import { Component, inject, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { ButtonComponent } from '../../../../shared/ui/button/button.component';
import { AuthService } from '../../../../core/auth/auth.service';
import { ProductSearchComponent } from '../../../product/components/product-search/product-search.component';
import { BadgeComponent } from '../../../../shared/ui/badge/badge.component';
import { CartService } from '../../../cart/services/cart.service';

@Component({
  selector: 'app-header',
  imports: [AsyncPipe, ButtonComponent, ProductSearchComponent, RouterLinkActive, RouterLink, BadgeComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  public authService = inject(AuthService);
  public cartService = inject(CartService);
  public isLogin$ = this.authService.isAuthenticated$;

  public buttonClickedLogIn = output();
  public buttonClickedLogOut = output();
  protected buttonClickedRegister = output();
  protected buttonClickedCart = output();
  public buttonClickedGoToHome = output();
  public buttonClickedProfile = output();
  public buttonClickedBooks = output();
  public buttonClickedCosmetics = output();
  public buttonClickedAboutUs = output();
}
