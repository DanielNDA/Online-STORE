import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Category} from '../model/category';
import {User} from '../../users/model/user';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private readonly categoriesUrl: string;

  constructor(private httpClient: HttpClient) {
    this.categoriesUrl = 'http://localhost:8080/categories';
  }

  // tslint:disable-next-line:typedef
  public save(category: Category) {
    return this.httpClient.post<Category>(this.categoriesUrl, category);
  }

  // tslint:disable-next-line:typedef
  public delete(id: number) {
    return this.httpClient.delete(`${this.categoriesUrl}/${id}`);
  }

  // tslint:disable-next-line:typedef
  public update(category: Category) {
    return this.httpClient.put<User>(this.categoriesUrl, category);
  }

  // tslint:disable-next-line:typedef
  public getById(id: number): Observable<any> {
    return this.httpClient.get(`${this.categoriesUrl}/${id}`);
  }

  public findAll(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.categoriesUrl);
  }
}
