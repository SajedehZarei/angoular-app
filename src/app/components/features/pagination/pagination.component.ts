import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';

@Component({
  selector: 'pagination',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
})
export class PaginationComponent implements OnInit, OnChanges {
  // page: number = 1;
  activePage: Array<number> = [];
  countPage: number;
  @Input() totalItem: number;
  @Input() perPage: number = 10;
  @Input() page: number = 1;

  @Output() changePage = new EventEmitter<any>();

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.calcPagination();
  }

  ngOnInit(): void {
    if (this._activatedRoute.snapshot.queryParamMap.get('page')) {
      this.page = Number(
        this._activatedRoute.snapshot.queryParamMap.get('page')
      );
    } else {
      this.page = 1;
    }
    this._router.navigate([], {
      relativeTo: this._activatedRoute,
      queryParams: { page: this.page },
      queryParamsHandling: 'merge',
    });

    this.calcPagination();
  }

  onClick(event: any) {
    this.changePage.emit(event);
  }

  calcPagination() {
    this.activePage = [];
    this.countPage = Math.ceil(this.totalItem / this.perPage);

    let minIndex =
      this.page - 3 <= 1 || this.page - 3 >= this.countPage ? 1 : this.page - 3;
    let maxIndex =
      this.page + 3 > this.countPage ? this.countPage : this.page + 3;
    for (let i = minIndex; i <= maxIndex; i++) {
      if (i >= 1 && i <= this.countPage) {
        this.activePage.push(i);
      }
    }
  }
}
