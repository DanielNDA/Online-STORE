import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly usersUrl: string;
  private readonly registerUrl: string;

  constructor(private http: HttpClient) {
    this.usersUrl = 'http://localhost:8080/users';
    this.registerUrl = 'http://localhost:8080/register';
  }

  public findAll(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }

  // tslint:disable-next-line:typedef
  public save(user: User) {
    return this.http.post<User>(this.registerUrl, user);
  }

  // tslint:disable-next-line:typedef
  public delete(id: number) {
    return this.http.delete(`${this.usersUrl}/${id}`);
  }

  // tslint:disable-next-line:typedef
  public update(user: User) {
    return this.http.put<User>(this.usersUrl, user);
  }

  // tslint:disable-next-line:typedef
  public getById(id: number): Observable<any> {
    return this.http.get(`${this.usersUrl}/${id}`);
  }
}
