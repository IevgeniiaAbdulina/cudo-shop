import { Component, inject, OnInit } from '@angular/core';
import { NavigateToSpecificRouteService } from '../../../shared/services/navigate-to-specific-route/navigate-to-specific-route.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  imports: [],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent implements OnInit {
  private router = inject(Router);
  private navigateToSpecificRouteService = inject(NavigateToSpecificRouteService);

  public currentRoute: string = '';

  public ngOnInit() {
    this.currentRoute = this.router.url;
    console.log(this.currentRoute);
  }

  public goBack(): void {
    this.navigateToSpecificRouteService.setRoute('.');
  }
}
