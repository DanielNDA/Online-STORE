import { Component, OnInit } from '@angular/core';
import {Product} from '../model/product';
import {Observable} from 'rxjs';
import {User} from '../../../users/model/user';
import {ProductService} from '../service/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {OrderService} from '../../../orders/service/order.service';
import {UserService} from '../../../users/service/user.service';
import {AuthService} from '../../../users/service/auth.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {


  products: Product[];
  image: Observable<any>;
  page = 1;
  currentUser: User;
  closeResult = '';
  searchValue = '';
  p = 1;
  numberOfItemsPerP = 5;

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
}
