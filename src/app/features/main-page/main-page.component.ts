import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavigateToSpecificRouteService } from '../../shared/services/navigate-to-specific-route/navigate-to-specific-route.service';
import { AuthService } from '../../core/auth/auth.service';
import { BreadcrumbComponent } from '../product/components/breadcrumb/breadcrumb.component';
import { PromotionTeaserComponent } from '../../shared/ui/promotion-teaser/promotion-teaser.component';

@Component({
  selector: 'app-main-page',
  imports: [HeaderComponent, FooterComponent, RouterOutlet, BreadcrumbComponent, PromotionTeaserComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private navigateToSpecificRouteService = inject(NavigateToSpecificRouteService);
  private authService = inject(AuthService);

  public title = 'cudo-shop';

  public ngOnInit() {
    this.navigateToSpecificRouteService.routeName$.subscribe((data) => {
      this.navigateToRoute(data);
    });
  }

  public navigateToRoute(route: string) {
    this.router.navigate([route], { relativeTo: this.route });
  }

  public goToLogInPage() {
    this.navigateToRoute('/login');
  }

  public goToRegisterPage() {
    this.navigateToRoute('/registration');
  }

  public userLoggedOut(): void {
    this.authService.logout();
  }

  public goToCart(): void {
    this.navigateToRoute('/cart');
  }
}
