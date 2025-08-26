import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneMask',
  standalone: true
})
export class PhoneMaskPipe implements PipeTransform {
  transform(phoneNumber: string): string {
    const maskedLength = 4;
    const maskedPart = phoneNumber.slice(5, 9).replace(/\d/g, '*');
    const visiblePart1 = phoneNumber.slice(0,4);
    const visiblePart2 = phoneNumber.slice(8,11);
    return visiblePart1 + maskedPart + visiblePart2;
  }
}