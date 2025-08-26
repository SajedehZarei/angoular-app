import { Injectable, signal } from '@angular/core';
import { Subject } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class VariablesService {
  fullname: string = '';
  nameUser = signal<string>('');
  constructor(private localStorageService: LocalStorageService) {
    let user = this.localStorageService.getUser()!;
    if (user && user.firstName) {
      this.fullname = user.firstName + ' ' + user.lastName;
    } else if (user && !user.firstName) {
      this.fullname = user.phoneNumber;
    }
    this.nameUser.set(this.fullname);
  }

  clickAcceptDialog: Subject<any> = new Subject();
  clickAcceptQuestionDialog: Subject<any> = new Subject();
  url = signal<Array<string>>(['/dashboard']);
  lang = signal<string>('fa');
  backMenu = signal<boolean>(false);
  showMenu = signal<boolean>(false);
}
