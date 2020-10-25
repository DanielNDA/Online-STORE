import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {User} from '../model/user';
import {UserService} from './user.service';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // BASE_PATH: 'http://localhost:8080'
  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser';
  TOKEN_SESSION_ATTRIBUTE_NAME = 'authenticatedUserToken';
  USER_DATA_SESSION_ATTRIBUTE_NAME = 'authenticatedUserData';


  public email: string;
  public password: string;
  public user: User;
  public isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private userService: UserService) {

  }

  // tslint:disable-next-line:typedef
  authenticationService(email: string, password: string) {
    return this.http.get(`http://localhost:8080/basicauth`,
      {headers: {authorization: this.createBasicAuthToken(email, password)}}).pipe(map((res) => {
      this.email = email;
      this.password = password;
      this.registerSuccessfulLogin(email, password);
    }));
  }

  // tslint:disable-next-line:typedef
  createBasicAuthToken(username: string, password: string) {
    return 'Basic ' + window.btoa(username + ':' + password);
  }

  // tslint:disable-next-line:typedef
  registerSuccessfulLogin(email, password) {
    sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, email);
    sessionStorage.setItem(this.TOKEN_SESSION_ATTRIBUTE_NAME, this.createBasicAuthToken(email, password));
    this.userService.getByEmail(email).subscribe(data => {
      this.user = data;
      sessionStorage.setItem(this.USER_DATA_SESSION_ATTRIBUTE_NAME, JSON.stringify(this.user));
      this.isLoggedIn.next(true);
    });
  }

  // tslint:disable-next-line:typedef
  logout() {
    sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    sessionStorage.removeItem(this.TOKEN_SESSION_ATTRIBUTE_NAME);
    sessionStorage.removeItem(this.USER_DATA_SESSION_ATTRIBUTE_NAME);
    this.isLoggedIn.next(false);
    this.email = null;
    this.password = null;
  }

  // tslint:disable-next-line:typedef
  isUserLoggedIn() {
    const user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    if (user === null) {
      this.isLoggedIn.next(false);
      return false;
    }
    this.isLoggedIn.next(true);
    return true;
  }

  // tslint:disable-next-line:typedef
  getLoggedInUserName() {
    const user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    if (user === null) {
      return '';
    }
    return user;
  }

  hasPrivilege(privilege: string): boolean {
    const user = JSON.parse(sessionStorage.getItem(this.USER_DATA_SESSION_ATTRIBUTE_NAME));
    if (user && user.roleList) {
      for (const role of user.roleList) {
        for (const priv of role.privilegeList) {
          if (priv.name === privilege) {
            return true;
          }
        }
      }
    }
    return false;
  }
}
