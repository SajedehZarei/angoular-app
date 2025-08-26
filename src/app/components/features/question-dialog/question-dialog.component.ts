import { Component, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { DialogCloseDirective, DialogRef } from '@ngneat/dialog';
import { LoadingBoxComponent } from '../loading/loading-box/loading-box.component';
import { ButtonComponent } from '../../shared/button/button.component';
import { NotificationsService } from '../../../services/app/notifications.service';
import { VariablesService } from '../../../services/app/variables.service';
import { BaseComponent } from '../../class/base.component';

@Component({
  selector: 'app-question-dialog',
  standalone: true,
  templateUrl: './question-dialog.component.html',
  styleUrls: ['./question-dialog.component.css'],
  imports: [ButtonComponent, LoadingBoxComponent, DialogCloseDirective],
  encapsulation: ViewEncapsulation.None,
})
export class QuestionDialogComponent extends BaseComponent implements OnInit {
  ref: DialogRef<any> = inject(DialogRef);
  constructor(
    protected notificationsService: NotificationsService,
    protected variablesService: VariablesService
  ) {
    super();
    this.ref.updateConfig({
      size: 'sm',
      height: 'auto',
    });
  }

  ngOnInit() {}

  onYesClick(event: any) {
    this.ref.close('accept');
    this.variablesService.clickAcceptQuestionDialog?.next('');
  }
  closeDialog() {
    this.ref.close('reject');
  }
}
