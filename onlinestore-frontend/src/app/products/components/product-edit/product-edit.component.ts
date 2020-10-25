import { Component, OnInit } from '@angular/core';
import {Product} from '../model/product';
import {ProductService} from '../service/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../users/service/auth.service';


@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  product: Product;
  id: number;
  boolean: boolean;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private productService: ProductService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.product = new Product();
    this.id = this.route.snapshot.params.id;
    this.productService.getById(this.id).subscribe(data => {
      this.product = data;
    });
  }

  // tslint:disable-next-line:typedef
  onSubmit() {
    this.productService.update(this.product).subscribe(result => this.goToProductList());
  }

  // tslint:disable-next-line:typedef
  goToProductList() {
    this.router.navigate(['product-view']);
  }

  // tslint:disable-next-line:typedef
  hasRole(role: string) {
    this.boolean = this.authService.hasRole(role);
    if (!this.boolean) {
      this.router.navigate(['products']);
    }
    return this.boolean;
  }
}
