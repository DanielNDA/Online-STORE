import { Component, OnInit } from '@angular/core';
import {Product} from '../model/product';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryService} from '../../../categories/service/category.service';
import {ProductService} from '../service/product.service';
import {User} from '../../../users/model/user';
import {OrderService} from '../../../orders/service/order.service';

@Component({
  selector: 'app-products-category',
  templateUrl: './products-category.component.html',
  styleUrls: ['./products-category.component.css']
})
export class ProductsCategoryComponent implements OnInit {

  products: Product[] = [];
  id: number;
  currentUser: User;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private categoryService: CategoryService,
              private productService: ProductService,
              private orderService: OrderService) {
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.getProductByCategory(this.id);
  }

  // tslint:disable-next-line:typedef
  getProductByCategory(id: number) {
    this.productService.findByCategory(id).subscribe(data => {
      this.products = data;
    });
  }

  // tslint:disable-next-line:typedef
  addToCart(productID: number) {
    const a = this.currentUser.email;
    console.log(this.currentUser.email);
    this.orderService.addToCart(a, productID).subscribe(data => {
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
}
