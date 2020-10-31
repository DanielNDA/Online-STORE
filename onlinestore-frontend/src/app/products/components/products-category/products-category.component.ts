import {Component, OnInit} from '@angular/core';
import {Product} from '../model/product';
import {ActivatedRoute, ActivatedRouteSnapshot, DetachedRouteHandle, Router, RouteReuseStrategy} from '@angular/router';
import {CategoryService} from '../../../categories/service/category.service';
import {ProductService} from '../service/product.service';
import {User} from '../../../users/model/user';
import {OrderService} from '../../../orders/service/order.service';
import {AuthService} from '../../../users/service/auth.service';

@Component({
  selector: 'app-products-category',
  templateUrl: './products-category.component.html',
  styleUrls: ['./products-category.component.css']
})
export class ProductsCategoryComponent implements OnInit  {

  products: Product[] = [];
  id: number;
  currentUser: User;
  boolean: boolean;
  config = {
    itemsPerPage: 6,
    currentPage: 1
  };

  constructor(private route: ActivatedRoute,
              private router: Router,
              private categoryService: CategoryService,
              private productService: ProductService,
              private orderService: OrderService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.getProductByCategory(this.id);
    this.route.params.subscribe((params) => {
      this.id = +params.id;
      this.getProductByCategory(this.id);
    });
  }

  // tslint:disable-next-line:typedef
  getProductByCategory(id: number) {
    this.productService.findByCategory(id).subscribe(data => {
      this.products = data;
      for (const p of this.products) {
        p.thumbnail = this.productService.getProductImage(p.id);
      }
    });
  }

  // tslint:disable-next-line:typedef
  addToCart(productID: number) {
    this.orderService.addToCart(productID).subscribe(data => {
      this.getProducts();
    });
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
  hasRole(role: string) {
    this.boolean = this.authService.hasRole(role);
    return this.boolean;
  }
}
