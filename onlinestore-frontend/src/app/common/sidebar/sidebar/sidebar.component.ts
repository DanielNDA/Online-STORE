import {Component, OnInit} from '@angular/core';
import {User} from '../../../users/model/user';
import {AuthService} from '../../../users/service/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../users/service/user.service';
import {Category} from '../../../categories/model/category';
import {CategoryService} from '../../../categories/service/category.service';
import {ProductService} from '../../../products/components/service/product.service';
import {Product} from '../../../products/components/model/product';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  isLoggedIn = false;
  isMenuCollapsed: true;
  currentUser: User;
  boolean: boolean;
  parents: Category[] = [];
  subCategories: Category[] = [];
  config = {
    itemsPerPage: 4,
    currentPage: 1
  };
  users: User[];
  searchValue = '';
  id: number;
  products: Product[];
  expanded = false;


  constructor(private authService: AuthService,
              private router: Router,
              private userService: UserService,
              private categoryService: CategoryService,
              private productService: ProductService,
              private route: ActivatedRoute) {
    this.currentUser = new User();
    this.currentUser.email = '';
  }

  ngOnInit(): void {
    this.getCategories();
    this.authService.isLoggedIn.subscribe(data => {
      this.isLoggedIn = data;
      this.currentUser = new User();
      if (this.isLoggedIn) {
        this.currentUser = JSON.parse(sessionStorage.getItem(this.authService.USER_DATA_SESSION_ATTRIBUTE_NAME));
        if (this.currentUser === null) {
          this.currentUser = new User();
        }
      }
    });
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

  // tslint:disable-next-line:typedef
  onLeftClick() {
    if (this.expanded === false) {
      this.expanded = true;
    } else if
    (this.expanded === true){
      this.expanded = false;
    }
  }
}
