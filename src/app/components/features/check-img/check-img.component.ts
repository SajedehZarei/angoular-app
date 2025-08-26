import { NgClass } from '@angular/common';
import { Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'check-img',
  standalone: true,
  templateUrl: './check-img.component.html',
  styleUrls: ['./check-img.component.css'],
  imports:[NgClass]
})
export class CheckImgComponent {
  @Input() url: string | null;
  @Input() type: string = 'img';
  @Input() width: string = '85';
  @Input() customClass: string = '';
  @Input() iconSrc: string = 'images/auth-page/Iot-logo.svg';
  @Input() imageSrc: string = 'images/layout-section/logo.png';

    @ViewChild('imageDevice') imageDevice: ElementRef;
  constructor(private renderer: Renderer2,) {}


    onError(e) {
   this.renderer.setProperty(this.imageDevice.nativeElement,'src',this.type == 'img' ? this.imageSrc : this.iconSrc);
  }

}
