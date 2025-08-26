import { Subscription } from 'rxjs';
import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
@Component({
  selector: '',
  standalone:true,
  template: '',
})
export class BaseComponent implements OnDestroy {
  @Output() protected afterClosed$ = new EventEmitter<any>();
  @Output() protected backdropClick$ = new EventEmitter<any>();

  protected unSubscribtions: Array<Subscription> = new Array<Subscription>();
  protected showLoading: boolean = false;
  protected data: any;
  protected totalItem: number;
  protected getDataAfterCloseDialog: any;
  protected getDataAfterAcceptDialog: any;
  protected findData: any;
  protected createData: any;
  protected updateData: any;
  public showMessage: boolean = false;
  protected modalTitle: string;
  protected printMessage: boolean;
  protected _updateSubacribtion: Subscription;
  protected _createSubacribtion: Subscription;
  protected _callSubacribtion: Subscription;
  protected _findSubacribtion: Subscription;

  public constructor() {}

  protected setLoading(): void {
    this.showLoading = true;
  }
  protected unSetLoading(): void {
    this.showLoading = false;
  }

  ngOnDestroy() {
    this.unSubscribtions.forEach((sb) => {
      sb.unsubscribe();
    });
  }
}
