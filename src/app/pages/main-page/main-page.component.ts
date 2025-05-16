import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { Book } from '../../shared/interfaces/book';
import { Cosmetics } from '../../shared/interfaces/cosmetics';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavigateToSpecificRouteService } from '../../shared/services/navigate-to-specific-route/navigate-to-specific-route.service';

@Component({
  selector: 'app-main-page',
  imports: [HeaderComponent, FooterComponent, RouterOutlet],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private navigateToSpecificRouteService = inject(NavigateToSpecificRouteService);

  public title = 'cudo-shop';

  public ngOnInit() {
    this.navigateToSpecificRouteService.routeName$.subscribe((data) => {
      this.navigateToRoute(data);
    });
  }

  public navigateToRoute(route: string) {
    this.router.navigate([route], { relativeTo: this.route });
  }

  public goToSignInPage() {
    this.router.navigate(['/sign-in'], { relativeTo: this.route });
  }

  public goToSignUpPage() {
    this.router.navigate(['/sign-up'], { relativeTo: this.route });
  }

  public books = signal<Book[]>([
    {
      id: 1,
      title: 'School',
    },
    {
      id: 2,
      title: 'Home',
    },
    {
      id: 3,
      title: 'Work',
    },
  ]);

  public cosmetics = signal<Cosmetics[]>([
    {
      id: 1,
      title: 'Hair care',
    },
    {
      id: 2,
      title: 'Skincare',
    },
    {
      id: 3,
      title: 'Perfume',
    },
  ]);
}
