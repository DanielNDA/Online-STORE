import { Component, OnInit } from '@angular/core';
import {Product} from '../model/product';
import {ProductService} from '../service/product.service';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  product: Product;
  id: number;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private productService: ProductService) {
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
    this.router.navigate(['/getProducts']);
  }
}
