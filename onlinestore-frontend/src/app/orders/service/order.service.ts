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
  private ul: string;

  constructor(private http: HttpClient) {
    this.cartURL = 'http://localhost:8080/add-to-cart';
    this.URL = 'http://localhost:8080/orders';
    this.deleteURL = 'http://localhost:8080/delete-order';
    this.updateURL = 'http://localhost:8080/update-order';
    this.checkoutURL = 'http://localhost:8080/checkout';
    this.ul = 'http://localhost:8080/order-history';
  }

  public findAll(): Observable<Order[]> {
    return this.http.get<Order[]>(this.URL);
  }

  public findOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.ul);
  }

  // tslint:disable-next-line:typedef
  public getByUsername(): Observable<Order> {
    return this.http.get<Order>('http://localhost:8080/orders/shopping-cart');
  }

  // tslint:disable-next-line:typedef
  public addToCart(productId: number) {
    return this.http.get<Order>(this.cartURL + '/' + productId);
  }

  // tslint:disable-next-line:typedef
  public delete(id: number) {
    return this.http.delete(`${this.deleteURL}/${id}`);
  }

  // tslint:disable-next-line:typedef
  public update(orderLineID: number, quantity: number): Observable<Order> {
    return this.http.get<Order>(this.updateURL + '/' + orderLineID + '/' + quantity);

  }

  public checkout(id: number): Observable<any> {
    return this.http.get(`${this.checkoutURL}/${id}`);
  }

  // tslint:disable-next-line:typedef
  public getById(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.URL}/${id}`);
  }

  // tslint:disable-next-line:typedef
  public getOrderLines(id: number): Observable<OrderLine[]> {
    return this.http.get<OrderLine[]>(`${this.URL}/shopping-cart/${id}`);
  }
}
