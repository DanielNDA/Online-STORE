import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryService} from '../../service/category.service';
import {Category} from '../../model/category';
import {Product} from '../../../products/components/model/product';
import {ProductService} from '../../../products/components/service/product.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  parents: Category[] = [];
  subCategories: Category[] = [];
  searchValue = '';

  constructor(private route: ActivatedRoute,
              private router: Router,
              private categoryService: CategoryService,
              private productService: ProductService) {
  }

  // tslint:disable-next-line:typedef
  ngOnInit(): void {
    this.getCategories();
  }

  // tslint:disable-next-line:typedef
  getCategories() {
    this.parents = [];
    this.categoryService.findAllParentNull().subscribe(data => {
      this.parents = data;
    });
  }

  // tslint:disable-next-line:typedef
  goToProductByCategory(id: number) {
    this.router.navigate(['products-category', id]);
  }
}
