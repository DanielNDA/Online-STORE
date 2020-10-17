import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../../users/model/user';
import {OrderLine} from '../model/order-line';
import {Order} from '../model/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private cartURL: string;
  private URL: string;
  private deleteURL: string;
  private updateURL: string;
  private checkoutURL: string;

  constructor(private http: HttpClient) {
    this.cartURL = 'http://localhost:8080/add-to-cart/{username}/{productID}';
    this.URL = 'http://localhost:8080/orders';
    this.deleteURL = 'http://localhost:8080/delete-order';
    this.updateURL = 'http://localhost:8080/update-order';
    this.checkoutURL = 'http://localhost:8080/checkout';
  }

  public findAll(): Observable<Order[]> {
    return this.http.get<Order[]>(this.URL);
  }

  // tslint:disable-next-line:typedef
  public addToCart(username: string, productID: number) {
    return this.http.post<Order>(`${this.cartURL}/${productID}`, username);
  }

  // tslint:disable-next-line:typedef
  public delete(id: number) {
    return this.http.delete(`${this.deleteURL}/${id}`);
  }

  // tslint:disable-next-line:typedef
  public update(username: string, orderLineID: number, quantity: number) {
    return this.http.put<Order>(`${this.updateURL}/${orderLineID}/${quantity}`, username);
  }

  // tslint:disable-next-line:typedef
  public removeFromCart(username: string, orderLineID: number) {
    return this.http.put<Order>(`${this.updateURL}/${orderLineID}`, username);
  }

  public checkout(id: number): Observable<any>{
    return this.http.get(`${this.updateURL}/${id}`);
  }

  // tslint:disable-next-line:typedef
  public getById(id: number): Observable<any> {
    return this.http.get(`${this.URL}/${id}`);
  }

  // tslint:disable-next-line:typedef
  public getOrderLines(id: number): Observable<OrderLine[]> {
    return this.http.get<OrderLine[]>(`${this.URL}/shopping-cart/${id}`);
  }
}
