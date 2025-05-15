import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class NavigateToSpecificRouteService {
  private routeSource: Subject<string> = new Subject<string>();

  public routeName$ = this.routeSource.asObservable();

  public setRoute(route: string) {
    this.routeSource.next(route);
  }
}
