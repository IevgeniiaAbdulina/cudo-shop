import { Component, Injectable, Input } from '@angular/core';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';

//import '@angular/localize/init';
import { Subject } from 'rxjs';

@Injectable()
export class MyCustomPaginatorIntl implements MatPaginatorIntl {
  public changes = new Subject<void>();
  public itemsPerPageLabel: string = '';
  public nextPageLabel: string = 'Next page';
  public previousPageLabel: string = 'Previous page';
  public firstPageLabel: string = 'First page';
  public lastPageLabel: string = 'Last page';

  public getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return 'Page 1 of 1';
    }
    const amountPages = Math.ceil(length / pageSize);

    return `Page ${page + 1} of ${amountPages};`;
  }
}

@Component({
  selector: 'app-paginator',
  imports: [MatPaginatorModule],
  providers: [{ provide: MatPaginatorIntl, useClass: MyCustomPaginatorIntl }],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss',
})
export class PaginatorComponent {
  @Input() public length = 0;
}
