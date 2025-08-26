import { Pipe, PipeTransform } from '@angular/core';
import { months } from './locale';

@Pipe({
  name: 'month',
  standalone: true
})
export class MonthPipe implements PipeTransform {

  transform(index: number): string {
    return months[index];
  }

}
