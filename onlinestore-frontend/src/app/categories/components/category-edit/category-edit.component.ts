import {Component, OnInit} from '@angular/core';
import {Category} from '../../model/category';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryService} from '../../service/category.service';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {

  category: Category;
  id: number;
  parents: Category[];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.category = new Category();
    this.id = this.route.snapshot.params.id;
    this.categoryService.getById(this.id).subscribe(data => {
      this.category = data;
      this.categoryService.findAll().subscribe(data1 => {
        this.parents = data1;
        this.parents.forEach(p => {
          if (p.id === this.category.parent.id) {
            this.category.parent = p;
          }
        });
      });
    });
  }

  // tslint:disable-next-line:typedef
  onSubmit() {
    this.categoryService.update(this.category).subscribe(data => {
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

  hasRole(role: string) {

  }
}
