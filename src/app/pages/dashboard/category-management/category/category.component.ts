

import {
  Component,
  ElementRef,
  inject,
  InjectionToken,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogService } from '@ngneat/dialog';
import { NotificationsService } from '../../../../services/app/notifications.service';
import { VariablesService } from '../../../../services/app/variables.service';
import { Extensions } from '../../../../tools/extensions';
import { LoadingPageComponent } from '../../../../components/features/loading/loading-page/loading-page.component';
import { ButtonComponent } from '../../../../components/shared/button/button.component';
import { InputComponent } from '../../../../components/shared/input/input.component';
import { FormBuilderComponent } from '../../../../components/class/form-builder.component';
import { BaseApiService } from '../../../../services/api/base-api.service';
import { LocalStorageService } from '../../../../services/app/local-storage.service';
import { ShareMethodsBaseComponent } from '../../../../components/class/share-methods.component';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { ICategory } from '../../../../models/api/category.model';
import { APP_ENV } from '../../../../../environment.config';
import { PaginationComponent } from '../../../../components/features/pagination/pagination.component';
import { CheckImgComponent } from "../../../../components/features/check-img/check-img.component";


@Component({
  selector: 'category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  imports: [LoadingPageComponent, ButtonComponent, PaginationComponent, CheckImgComponent],
  standalone: true,
})
export class CategoryComponent
  extends ShareMethodsBaseComponent
  implements OnInit
{
  private env = inject(APP_ENV);
  items: Array<ICategory> = [];
  page: number = 1;
  perPage: number = 10;
  constructor(
    protected notificationsService: NotificationsService,
    protected dialogService: DialogService,
    protected variablesService: VariablesService,
    protected baseApiService: BaseApiService,
     private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) {
    super(
      notificationsService,
      dialogService,
      variablesService,
      baseApiService
    );
  }

  ngOnInit(): void {
    if (this._activatedRoute.snapshot.queryParamMap.get('page')) {
      this.page = Number(
        this._activatedRoute.snapshot.queryParamMap.get('page')
      );
    } else {
      this.page = 1;
    }
    this.indexItems();
    
  }

  indexItems() {
    this.callApi<Array<ICategory>>(
      this.baseApiService.GetApi<Array<ICategory>>(
        `/Category/GetAll?Page=${this.page}&PerPage=${this.perPage}`,
        this.env.APIEndpointMarket
      )
    ).subscribe({
      next: (res) => {
        this.items = res.result;
        this.totalItem = res.total!;
      },
    });
  }

showForm(itemId?: string) {
  console.log('دکمه کلیک شد ✅', itemId);
  if (itemId)
    this._router.navigate(['/dashboard/category-management/category/detail']);

  else
   this._router.navigate(['/dashboard/category-management/category/detail']);

}

  deleteItem(itemId: string) {
    this.callQuestionDialog(this.baseApiService.DestroyApi(`/Category/${itemId}`,this.env.APIEndpointMarket))
  }

  protected actionAfterAcceptQuestion(value?: any): void {
    this.indexItems()
  }
  
  changePage(page:number){
    this.page = page;
    this.indexItems()
  }
}
