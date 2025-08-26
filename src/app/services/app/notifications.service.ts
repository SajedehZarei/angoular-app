import { Injectable } from '@angular/core';
import {
  ActiveToast,
  GlobalConfig,
  IndividualConfig,
  ToastrService,
} from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  readonly options: GlobalConfig;
  private lastInserted: number[] = [];
  constructor(private toastr: ToastrService) {
    this.options = this.toastr.toastrConfig;
  }

  successToastr(title?: string, message?: string) {
    const opts = this.options;
    opts.progressBar = true;
    return this.showToast(message, title, opts, opts.iconClasses.success);
  }

  warningToastr(title?: string, message?: string) {
    const opts = this.options;
    opts.progressBar = true;
    return this.showToast(message, title, opts, opts.iconClasses.warning);
  }

  errorToastr(title?: string, message?: string) {
    const opts = this.options;
    opts.progressBar = true;
    return this.showToast(message, title, opts, opts.iconClasses.error);
  }

  showToast(
    message?: string,
    title?: string,
    override?: Partial<IndividualConfig>,
    type?: string
  ): ActiveToast<any> {
    const inserted = this.toastr.show(message, title, override, type);
    if (inserted) {
      this.lastInserted.push(inserted.toastId);
    }
    return inserted;
  }
}
