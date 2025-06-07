import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { BreadcrumbService } from './breadcrumb.service';
import { Observable } from 'rxjs';
import { Breadcrumb } from './breadcrumb.model';

@Component({
  selector: 'app-breadcrumb',
  imports: [RouterLink, NgForOf, NgIf, AsyncPipe],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss',
})
export class BreadcrumbComponent {
  private breadcrumbService: BreadcrumbService = inject(BreadcrumbService);
  public breadcrumbs$: Observable<Breadcrumb[]> = this.breadcrumbService.breadcrumbs$;

  constructor() {}
}
