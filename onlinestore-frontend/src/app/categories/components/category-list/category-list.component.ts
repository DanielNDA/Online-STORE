import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryService} from '../../service/category.service';
import {Category} from '../../model/category';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  parents: Category[] = [];
  subCategories: Category[] = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private categoryService: CategoryService) {
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


}
