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
    this.cartURL = 'http://localhost:8080/add-to-cart';
    this.URL = 'http://localhost:8080/orders';
    this.deleteURL = 'http://localhost:8080/delete-order';
    this.updateURL = 'http://localhost:8080/update-order';
    this.checkoutURL = 'http://localhost:8080/checkout';
  }

  public findAll(): Observable<Order[]> {
    return this.http.get<Order[]>(this.URL);
  }

  public findOrders(username: string): Observable<Order[]> {
    return this.http.get<Order[]>('http://localhost:8080/order-history' + username);
  }

  // tslint:disable-next-line:typedef
  public addToCart(email: string, productId: number){
    return  this.http.get<Order>(this.cartURL + '/' + email + '/' + productId);
  }

  // tslint:disable-next-line:typedef
  public delete(id: number) {
    return this.http.delete(`${this.deleteURL}/${id}`);
  }

  // tslint:disable-next-line:typedef
  public update(username: string, orderLineID: number, quantity: number): Observable<Order> {
    return this.http.get<Order>(this.updateURL + '/' + username + '/' + orderLineID + '/' + quantity);

  }

  // tslint:disable-next-line:typedef
  public removeFromCart(username: string, orderLineID: number) {
    return this.http.put<Order>(`${this.updateURL}/${orderLineID}`, username);
  }

  public checkout(id: number): Observable<any>{
    return this.http.get(`${this.checkoutURL}/${id}`);
  }

  // tslint:disable-next-line:typedef
  public getById(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.URL}/${id}`);
  }

  // tslint:disable-next-line:typedef
  public getByUsername(email: string): Observable<Order> {
    return this.http.get<Order>('http://localhost:8080/orders/shopping-cart/' + email);
  }

  // tslint:disable-next-line:typedef
  public getOrderLines(id: number): Observable<OrderLine[]> {
    return this.http.get<OrderLine[]>(`${this.URL}/shopping-cart/${id}`);
  }
}
