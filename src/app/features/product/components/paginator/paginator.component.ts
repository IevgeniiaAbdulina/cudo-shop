import { Component, EventEmitter, Injectable, Input, OnInit, Output } from '@angular/core';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
//import { HttpClient } from '@angular/common/http';

//import '@angular/localize/init';
import { Subject } from 'rxjs';
//import { environment } from '../../../../../environments/environment.dev';
//import { ProductProjection } from '../../../../core/product/interfaces/product-projection';

// interface ApiResponse {
//   //data: any[]; // замените 'any' на конкретный тип данных, если есть
//   products: ProductProjection[];
//   totalItems: number;
// }

@Injectable()
export class MyCustomPaginatorIntl implements MatPaginatorIntl {
  public changes = new Subject<void>();
  public itemsPerPageLabel: string = '';
  public nextPageLabel: string = 'Next page';
  public previousPageLabel: string = 'Previous page';
  public firstPageLabel: string = 'First page';
  public lastPageLabel: string = 'Last page';

  public getRangeLabel(page: number, pageSize: number, length: number): string {
    console.log('getRangeLabel', page, pageSize, length);
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
  // public products: ProductProjection[] = [];
  //@Input() public totalItems = 0;
  //public pageSize = 6;
  //public currentPage = 1;
  @Input() public length = 0;
  public pageSizeOptions: number[] = [6, 12, 24];
  public pageLimit = this.pageSizeOptions[0];

  @Output() public pageLimitChange = new EventEmitter<{ pageIndex: number; pageSize: number }>();

  public onLimitChange(event: { pageIndex: number; pageSize: number }): void {
    console.log('onLimitChange');
    //this.pageLimit = pageSize;
    this.pageLimitChange.emit(event);
  }

  //@Output() public pageChange = new EventEmitter<{ pageIndex: number; pageSize: number }>();

  // private readonly PROJECT_KEY: string = environment.projectKey;
  // private readonly API_URL: string = environment.apiUrl;
  // protected apiUrlRequest: string = `${this.API_URL}/${this.PROJECT_KEY}/product-projections/search`;

  //constructor(private http: HttpClient) {}

  // public onPageChange(event: { pageIndex: number; pageSize: number }): void {
  //   this.pageChange.emit(event);
  // }
}
