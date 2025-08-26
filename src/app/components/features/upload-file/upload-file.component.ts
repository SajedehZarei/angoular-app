import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { LabelComponent } from '../../shared/label/label.component';
import { ButtonComponent } from '../../shared/button/button.component';
import { NotificationsService } from '../../../services/app/notifications.service';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'upload-file',
  standalone: true,
  imports: [LabelComponent, NgStyle, ButtonComponent],
  templateUrl: './upload-file.component.html',
  styleUrl: './upload-file.component.css',
})
export class UploadFileComponent implements OnInit {
  // page: number = 1;
  activePage: Array<number> = [];
  countPage: number;
  @Input() formControllName: any;
  @Input() countUpload: number = 1;
  @Input() hasPreview: boolean = false;
  @Input() validType: Array<string> = [
    'image/jpeg',
    'image/png',
    'video/mp4',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  ];
  @Input() validSizeByKB: number = 1024;
  @Input() label: string = 'پیوست';
  attachments: Array<any> = [];
  previews: Array<any> = [];
  repeatAttachment: boolean = false;
  fileName: string = 'Drop files to attach, or browse';

  @Output() changePage = new EventEmitter<any>();

  constructor(private notificationsService: NotificationsService) {}

  ngOnInit(): void {}

  onDragOver(event: Event) {
    event.preventDefault();
    event.stopPropagation();
  }

  onDragEnter(event: Event) {
    event.preventDefault();
    event.stopPropagation();
  }

  onDragLeave(event: Event) {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const files = event.dataTransfer?.files;
    this.handleFiles(files);
  }

  handleFileInput(event: Event) {
    //  console.log("event",event);

    const files = (event.target as HTMLInputElement).files;
    this.handleFiles(files);
  }

  handleFiles(files: any) {
    const reader = new FileReader();

    if (this.attachments.length < this.countUpload) {
      for (let i = 0; i < files.length; i++) {
        console.log("files",files[i].type);
        if (this.validType.includes(files[i].type)) {
          if (files[i].size <= 1024 * this.validSizeByKB) {
            if (this.attachments.length == 0) {
              this.attachments.push(files[i]);
              this.formControllName.setValue(this.attachments);
              this.fileName = '(' + this.attachments.length + ')' + ' فایل ';
              reader.onload = (e: any) => {
                this.previews.push(e.target.result);
              };
              reader.readAsDataURL(files[i]);
            } else {
              this.attachments.forEach((attachment) => {
                if (attachment.name == files[i].name) {
                  this.repeatAttachment = true;
                }
              });

              if (!this.repeatAttachment) {
                this.attachments.push(files[i]);
                this.formControllName.setValue(this.attachments);
                this.fileName = '(' + this.attachments.length + ')' + ' فایل ';

                reader.onload = (e: any) => {
                  this.previews.push(e.target.result);
                };
                reader.readAsDataURL(files[i]);
              } else {
                this.repeatAttachment = false;
                this.notificationsService.errorToastr(
                  'فایل انتخابی شما تکراری است'
                );
              }
            }
          } else {
            this.notificationsService.errorToastr(
              `حداکثر حجم مجاز ${this.validSizeByKB}  کیلو بایت`
            );
          }
        } else {
          this.notificationsService.errorToastr(
            '  فایل انتخابی شما مجاز نمی باشند'
          );
        }
      }
    } else {
      this.notificationsService.errorToastr(
        `حداکثر تعداد مجاز بارگذاری ${this.countUpload} عدد می باشد`
      );
    }
  }

  removeAttachment(index: number) {
    this.attachments.splice(index, 1);
    this.previews.splice(index, 1);
    this.formControllName.reset();
    if (this.attachments.length > 0) {
      this.fileName = '(' + this.attachments.length + ')' + ' فایل ';
    } else {
      this.fileName = 'Drop files to attach, or browse';
    }
  }
}
