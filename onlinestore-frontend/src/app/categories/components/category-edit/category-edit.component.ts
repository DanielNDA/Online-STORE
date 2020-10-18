import {Component, OnInit} from '@angular/core';
import {User} from '../../../users/model/user';
import {Address} from '../../../addresses/model/address';
import {Category} from '../../model/category';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../users/service/user.service';
import {AddressService} from '../../../addresses/service/address.service';
import {CategoryService} from '../../service/category.service';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {

  category: Category;
  parent: Category;
  id: number;
  parents: Category[];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.categoryService.findAllParentNull().subscribe(data => {
      this.parents = data;
    });
    this.category = new Category();
    this.parent = new Category();
    this.id = this.route.snapshot.params.id;
    this.categoryService.getById(this.id).subscribe(data => {
      this.category = data;
    });
  }

  // tslint:disable-next-line:typedef
  onSubmit() {
    this.categoryService.update(this.category).subscribe(data => {
      this.goToCategoryList();
    });
  }

  goToCategoryList() {
    this.router.navigate(['']);
  }
}
