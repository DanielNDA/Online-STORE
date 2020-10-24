import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly usersUrl: string;
  private readonly registerUrl: string;
  private readonly imageUrl: string;
  private readonly userUrl: string;

  constructor(private http: HttpClient) {
    this.usersUrl = 'http://localhost:8080/users';
    this.userUrl = 'http://localhost:8080/user';
    this.registerUrl = 'http://localhost:8080/register';
    this.imageUrl = 'http://localhost:8080/images';
  }

  public findAll(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }

  // tslint:disable-next-line:typedef
  public save(user: User) {
    return this.http.post<User>(this.registerUrl, user);
  }

  // tslint:disable-next-line:typedef
  public getByEmail(email: string): Observable<any> {
    return this.http.get(`${this.userUrl}/${email}`);
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

  public upload(image: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('image', image);
    const req = new HttpRequest('POST', this.imageUrl, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  getImage(): Observable<any> {
    return this.http.get(this.imageUrl);
  }

  getUserImage(id: number): Observable<any> {
    return this.http.get(`http://localhost:8080/images/${id}`);
  }
}
