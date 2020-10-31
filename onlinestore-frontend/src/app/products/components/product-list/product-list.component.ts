import {Component, OnInit} from '@angular/core';
import {Product} from '../model/product';
import {ProductService} from '../service/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {OrderService} from '../../../orders/service/order.service';
import {Observable} from 'rxjs';
import {User} from '../../../users/model/user';
import {UserService} from '../../../users/service/user.service';
import {AuthService} from '../../../users/service/auth.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[];
  image: Observable<any>;
  config = {
    itemsPerPage: 6,
    currentPage: 1
  };
  currentUser: User;
  boolean: boolean;

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private router: Router,
              private orderService: OrderService,
              private userService: UserService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.getProducts();
    this.currentUser = JSON.parse(sessionStorage.getItem(this.authService.USER_DATA_SESSION_ATTRIBUTE_NAME));
  }


  getPhoto(id: number): Observable<any> {
    return this.productService.getProductImage(id);
  }

  // tslint:disable-next-line:typedef
  getProducts() {
    this.productService.findAll().subscribe(data => {
      this.products = data;
      for (const p of this.products) {
        p.thumbnail = this.productService.getProductImage(p.id);
      }
    });
  }

  // tslint:disable-next-line:typedef
  deleteProduct(id: number) {
    this.productService.delete(id).subscribe(data => {
      this.getProducts();
    });
  }

  // tslint:disable-next-line:typedef
  editProduct(id: number) {
    this.router.navigate(['product-edit', id]);
  }

  // tslint:disable-next-line:typedef
  addProduct() {
    this.router.navigate(['product-add']);
  }

  // tslint:disable-next-line:typedef
  addToCart(productID: number) {
    this.orderService.addToCart(productID).subscribe(data => {
      this.getProducts();
    });
  }
  // tslint:disable-next-line:typedef
  hasRole(role: string) {
    this.boolean = this.authService.hasRole(role);
    return this.boolean;
  }
}
