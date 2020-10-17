import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryService} from '../../service/category.service';
import {Category} from '../../model/category';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {

  category: Category;
  parents: Category[];
  categories: Category[];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private categoryService: CategoryService) {
    this.category = new Category();
  }

  ngOnInit(): void {
    this.categoryService.findAll().subscribe(data => {
      this.parents = data;
    });
  }

  // tslint:disable-next-line:typedef
  onSubmit() {
    this.categoryService.save(this.category).subscribe(data => {
      this.goToCategoryList();
    });
  }

  // tslint:disable-next-line:typedef
  goToCategoryList() {
    this.router.navigate(['']);
  }
}
