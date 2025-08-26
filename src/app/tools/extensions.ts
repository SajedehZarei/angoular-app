import { AbstractControl, ValidatorFn } from '@angular/forms';
import { SafeHtml } from '@angular/platform-browser';
import jMoment_ from 'moment-jalaali';
import jalaali from 'jalaali-js';
const jMoment = jMoment_;
export class Extensions {
  getDate(timestamp, typeDate = 'full') {
    if (!timestamp) return;

    const date = jMoment(Number(timestamp));
    if (typeDate == 'full') return date.format('jYYYY/jMM/jDD HH:mm:ss');
    if (typeDate == 'date') return date.format('jYYYY/jMM/jDD');
    if (typeDate == 'time') return date.format('HH:mm:ss');
  }

  getTimestamp(date: string, isToDate: boolean = false) {
    let dateTime;
    if (!date) return;

    let miladi = jMoment(date, 'jYYYY-jM-jD').format('YYYY/M/D');

    if (isToDate) {
      //      یک روز به تاریخ اضافه می‌شود
      // miladi = miladi.add(1, 'day');
      dateTime = `${miladi} 23:59`;
    } else {
      dateTime = miladi;
    }

    return new Date(dateTime).getTime();
  }

  getJalaliDate(param, dateTime = false) {
    if (!param) return;
    return dateTime
      ? jMoment(param, 'YYYY-M-D HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss')
      : jMoment(param, 'YYYY-M-D').format('jYYYY/jM/jD');
  }

  getJalaliYear(param) {
    if (!param) return;
    return jMoment(param, 'YYYY-M-D').format('jYYYY');
  }

  convertToJalali(georgianDate: string): string {
    const [year, month, day] = georgianDate.split('-').map(Number);
    const jDate = jalaali.toJalaali(year, month, day);
    return `${jDate.jy}-${jDate.jm}-${jDate.jd}`;
  }

  isBeforeDate(date) {
    const targetDate = jMoment(date, 'YYYY-MM-DD'); //تاریخ به میلادی
    const isPast = targetDate.isBefore(jMoment());
    return isPast;
  }

  getPlainText(html: string): SafeHtml {
    const plainText = html.replace(/<[^>]*>/g, '');
    return plainText;
  }

  operationFormControl(
    controlName: string,
    condition: string,
    messageError: string
  ): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null | any => {
      if (!control.parent) return null;
      if (!control.parent.get(controlName)?.value) return null;
      if (condition == 'Equal')
        if (control.value == control.parent.get(controlName)?.value) {
          control.parent.get(controlName)?.setErrors(null);
          return null;
        } else return { incorrect: messageError };

      if (condition == 'smallerEqual')
        if (control.value > control.parent.get(controlName)?.value) {
          control.parent.get(controlName)?.setErrors(null);
          return null;
        } else return { incorrect: messageError };

      if (condition == 'greaterEqual')
        if (control.value < control.parent.get(controlName)?.value) {
          control.parent.get(controlName)?.setErrors(null);
          return null;
        } else return { incorrect: messageError };
    };
  }

  public dateValidation(
    controlName: string,
    condition: string,
    labelControlName: string
  ): ValidatorFn {
    return (control: AbstractControl | any): { [key: string]: any } | any => {
      if (!control.parent) return null;
      if (!control.parent.get(controlName).value) return null;
      if (condition == '<=')
        if (
          Date.parse(control.value) <
          Date.parse(control.parent.get(controlName).value)
        ) {
          control.parent.get(controlName).setErrors(null);
          return null;
        } else {
          return {
            errorDate: `نباید از  ${labelControlName} بزگتر یا مساوی باشد`,
          };
        }
      if (condition == '<')
        if (
          Date.parse(control.value) <=
          Date.parse(control.parent.get(controlName).value)
        ) {
          control.parent.get(controlName).setErrors(null);
          return null;
        } else
          return {
            errorDate: `نباید از  ${labelControlName} بزرگتر باشد`,
          };
      if (condition == '>=')
        if (
          Date.parse(control.value) >
          Date.parse(control.parent.get(controlName).value)
        ) {
          control.parent.get(controlName).setErrors(null);
          return null;
        } else
          return {
            errorDate: `نباید از  ${labelControlName} کوچکتر یا مساوی باشد`,
          };
      if (condition == '>')
        if (
          Date.parse(control.value) >=
          Date.parse(control.parent.get(controlName).value)
        ) {
          control.parent.get(controlName).setErrors(null);
          return null;
        } else
          return {
            errorDate: `نباید از  ${labelControlName} کوچکتر باشد`,
          };
    };
  }

  checkValidationNationalCode(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null | any => {
      if (!control) return null;
      if (!control.value) return null;
      let Arr = Array.from(String(control.value));
      if (control.value.length != 10) {
        return { errorNationalCode: 'کد ملی معتبر نیست' };
      } else {
        let Sum = 0;
        let Last;

        for (let i = 0; i < 9; i++) {
          Sum += +Arr[i] * (10 - i);
        }
        let divideRemaining = Sum % 11;
        if (divideRemaining < 2) {
          Last = divideRemaining;
        } else {
          Last = 11 - divideRemaining;
        }
        let n = Arr[9];
        return Last != n ? { errorNationalCode: 'کد ملی معتبر نیست' } : null;
      }
    };
  }

  public noWhitespaceValidator(): ValidatorFn {
    return (control: AbstractControl | any): { [key: string]: any } | any => {
      if (!control.value) return null;
      const isWhitespace =
        (control.value || '').trim().length !== control.value.length;
      return isWhitespace
        ? { incorrect: 'مقدار نامعتبر-استفاده از کاراکتر خاص' }
        : null;
    };
  }

  public noSpecialCharactersValidator(): ValidatorFn {
    return (control: AbstractControl | any): { [key: string]: any } | any => {
      if (!control.value) return null;
      const forbiddenChars = /[^a-zA-Z0-9ا-یءآ ]/; // اجازه فقط برای حروف، اعداد و فاصله
      const hasSpecialChars = forbiddenChars.test(control.value);
      return hasSpecialChars
        ? { incorrect: 'مقدار نامعتبر-استفاده از کاراکتر خاص' }
        : null;
    };
  }
}
