import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import {Product} from '../model/product';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productUrl: string;
  private thumbnailUrl: string;

  constructor(private http: HttpClient) {
    this.productUrl = 'http://localhost:8080/products';
    this.thumbnailUrl = 'http://localhost:8080/thumbnail';
  }

  public findAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productUrl);
  }

  // tslint:disable-next-line:typedef
  public save(user: Product) {
    return this.http.post<Product>(this.productUrl, user);
  }

  // tslint:disable-next-line:typedef
  public delete(id: number) {
    return this.http.delete(`${this.productUrl}/${id}`);
  }

  // tslint:disable-next-line:typedef
  public update(user: Product) {
    return this.http.put<Product>(this.productUrl, user);
  }

  // tslint:disable-next-line:typedef
  public getById(id: number): Observable<any> {
    return this.http.get(`${this.productUrl}/${id}`);
  }
  public upload(photo: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('photo', photo);
    const req = new HttpRequest('POST', this.thumbnailUrl, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  getThumbnail(id: number): Observable<any> {
    return this.http.get(`http://localhost:8080/thumbnail/${id}`);
  }

}
