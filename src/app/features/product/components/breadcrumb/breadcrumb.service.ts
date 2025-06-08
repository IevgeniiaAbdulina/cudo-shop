import { Injectable, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject, filter } from 'rxjs';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { Breadcrumb } from './breadcrumb.model';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  private readonly _breadcrumbs$ = new BehaviorSubject<Breadcrumb[]>([]);
  public readonly breadcrumbs$ = this._breadcrumbs$.asObservable();

  public selectedCategoryName: WritableSignal<string> = signal<string>('');

  constructor(private router: Router) {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      const root = this.router.routerState.snapshot.root;
      const breadcrumbs: Breadcrumb[] = [];
      this.addBreadcrumb(root, [], breadcrumbs);
      this._breadcrumbs$.next(breadcrumbs);
      this.selectedCategoryName.set('');
    });
  }

  private addBreadcrumb(route: ActivatedRouteSnapshot, parentUrl: string[], breadcrumbs: Breadcrumb[]) {
    if (route) {
      const routeUrl = parentUrl.concat(route.url.map((url) => url.path));

      if (route.data['breadcrumb']) {
        const breadcrumb = {
          label: route.data['breadcrumb'],
          url: '/' + routeUrl.join('/'),
        };
        breadcrumbs.push(breadcrumb);
      }

      if (route.firstChild) {
        this.addBreadcrumb(route.firstChild, routeUrl, breadcrumbs);
      }
    }
  }

  public setLastBreadcrumb(category: string): void {
    this._breadcrumbs$.value.push({ label: category, url: '/' });
  }

  public removeLastBreadcrumb(): void {
    this._breadcrumbs$.value.pop();
  }

  public resetCurrentCategory() {
    if (this.selectedCategoryName() !== '' && this.selectedCategoryName() === this.getLast()?.label) {
      this.removeLastBreadcrumb();
      this.selectedCategoryName.set('');
    }
  }

  public setCategory(category: string): void {
    if (category === this.selectedCategoryName()) {
      return;
    }

    if (this.selectedCategoryName() === '') {
      this.setLastBreadcrumb(category);
    } else if (this.selectedCategoryName() === this.getLast()?.label) {
      //if category already shown, just replace with new one
      this.removeLastBreadcrumb();
      this.setLastBreadcrumb(category);
    } else {
      //do nothing
    }

    this.selectedCategoryName.set(category);
  }

  private getLast(): Breadcrumb | null {
    const array: Breadcrumb[] = this._breadcrumbs$.value;
    if (array.length > 0) {
      return array[array.length - 1];
    }

    return null;
  }
}
