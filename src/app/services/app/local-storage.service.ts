import {Injectable} from '@angular/core';

const TOKEN_KEY = 'accessToken';
const REFRESHTOKEN_KEY = 'refreshToken';
const USER_KEY = 'userInfo';
const PHONENUMBER_KEY = 'phoneNumber';
const PASSWORD_KEY = 'password';
const ROLE_KEY = 'role';
const LANG_KEY = 'lang';
const URL_KEY = 'urls';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {
  }

  signOut(): void {
    localStorage.clear();
  }

  public saveToken(token: string): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY, token);
    const user = this.getUser();
    if (user.id) {
      this.saveUser({...user, accessToken: token});
    }
  }

  public getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY) ? localStorage.getItem(TOKEN_KEY) : null;
  }

  public saveRefreshToken(token: string): void {
    localStorage.removeItem(REFRESHTOKEN_KEY);
    localStorage.setItem(REFRESHTOKEN_KEY, token);
  }
  
  public saveRole(role: string): void {
    localStorage.removeItem(ROLE_KEY);
    localStorage.setItem(ROLE_KEY, role);
  }

  public getRefreshToken(): string | null {
    return localStorage.getItem(REFRESHTOKEN_KEY);
  }

  public saveUser(user: any): void {
    localStorage.removeItem(USER_KEY);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
  
  public savePassword(pass: any): void {
    localStorage.removeItem(PASSWORD_KEY);
    localStorage.setItem(PASSWORD_KEY, pass);
  }

  public getUser(): any {
    const user = localStorage.getItem(USER_KEY) ? localStorage.getItem(USER_KEY) : null;
    if (user) {
      return JSON.parse(user);
    }
    return user;
  }
  public savePhoneNumber(phoneNumber: string): void {
    localStorage.removeItem(PHONENUMBER_KEY);
    localStorage.setItem(PHONENUMBER_KEY, phoneNumber);
  }
  public getPhoneNumber(): string | null {
    return localStorage.getItem(PHONENUMBER_KEY) ? localStorage.getItem(PHONENUMBER_KEY) : null;
  }

  public saveLang(lang: string){
    localStorage.removeItem(LANG_KEY);
    localStorage.setItem(LANG_KEY, lang);
  }

  public getLang(){
    return localStorage.getItem(LANG_KEY) ? localStorage.getItem(LANG_KEY) : 'fa';
  }

    public saveUrls(url): void {
    if (!localStorage.getItem(URL_KEY)) {
      localStorage.setItem(URL_KEY, JSON.stringify([url]));
    } else {
      if (url != '/dashboard/managment-mission' || Array.isArray(url)) {
        var arrayUrl = JSON.parse(localStorage.getItem(URL_KEY)!);

        if (Array.isArray(url)) {
          localStorage.removeItem(URL_KEY);
          localStorage.setItem(URL_KEY, JSON.stringify(url));
        } else {
          arrayUrl.push(url);
          localStorage.setItem(URL_KEY, JSON.stringify(arrayUrl));
        }
      }
    }
  }

  public getUrls(): any {
    const urls = localStorage.getItem(URL_KEY)
      ? localStorage.getItem(URL_KEY)
      : null;
    if (urls) {
      return JSON.parse(urls);
    }
    return urls;
  }

  public clear(): void {
    localStorage.clear();
    // this._variablesService.loginUser.next('')
  }

  public hasLoginUser(): boolean{
    if (localStorage.getItem(USER_KEY)) {
      return true;
    }else{
      return false;
    }
    
  }
}
