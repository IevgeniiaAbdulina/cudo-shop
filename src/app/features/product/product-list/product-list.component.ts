import { Component, inject, OnInit, Signal } from '@angular/core';
import { NavigateToSpecificRouteService } from '../../../shared/services/navigate-to-specific-route/navigate-to-specific-route.service';
import { Router, ROUTER_OUTLET_DATA } from '@angular/router';
import { Book } from '../../../shared/interfaces/book';
import { Cosmetics } from '../../../shared/interfaces/cosmetics';

@Component({
  selector: 'app-product-list',
  imports: [],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent implements OnInit {
  private router = inject(Router);
  private navigateToSpecificRouteService = inject(NavigateToSpecificRouteService);
  private data = inject(ROUTER_OUTLET_DATA) as Signal<{
    books: Book[];
    cosmetics: Cosmetics[];
  }>;

  public currentRoute: string = '';
  public books = this.data().books;
  public cosmetics = this.data().cosmetics;

  public ngOnInit() {
    this.currentRoute = this.router.url;
    console.log(this.currentRoute);
  }

  public goBack(): void {
    this.navigateToSpecificRouteService.setRoute('.');
  }
}
