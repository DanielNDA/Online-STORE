import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryService} from '../../service/category.service';
import {Category} from '../../model/category';
import {AuthService} from '../../../users/service/auth.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {

  category: Category;
  parents: Category[];
  categories: Category[];
  boolean: boolean;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private categoryService: CategoryService,
              private authService: AuthService) {
    this.category = new Category();
  }

  ngOnInit(): void {
    this.categoryService.findAllParentNull().subscribe(data => {
      this.parents = data;
    });
  }

  // tslint:disable-next-line:typedef
  onSubmit() {
    this.categoryService.save(this.category).subscribe(data => {
      this.goToCategoryList();
    }, error => {
      console.clear();
      if (error.error.error === 'Forbidden') {
        this.router.navigate(['products']);
      }
    });
  }

  // tslint:disable-next-line:typedef
  goToCategoryList() {
    this.router.navigate(['category-list']);
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
