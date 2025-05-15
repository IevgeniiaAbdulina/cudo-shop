import { Component, inject } from "@angular/core";
import { NavigateToSpecificRouteService } from "../../shared/services/navigate-to-specific-route/navigate-to-specific-route.service";

@Component({
  selector: "app-page-not-found",
  imports: [],
  templateUrl: "./page-not-found.component.html",
  styleUrl: "./page-not-found.component.scss",
})
export class PageNotFoundComponent {
  private navigateToSpecificRouteService = inject(NavigateToSpecificRouteService);

  public backToHomepage(): void {
    this.navigateToSpecificRouteService.setRoute("home");
  }
}
