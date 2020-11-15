import {Component, OnInit} from '@angular/core';
import {Category} from '../../model/category';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryService} from '../../service/category.service';
import {AuthService} from '../../../users/service/auth.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-category-subcategories',
  templateUrl: './category-subcategories.component.html',
  styleUrls: ['./category-subcategories.component.css']
})
export class CategorySubcategoriesComponent implements OnInit {

  categories: Category[];
  closeResult = '';
  parent: Category;
  id: number;
  searchValue = '';
  config = {
    itemsPerPage: 6,
    currentPage: 1
  };
  boolean: boolean;
  allCategories: Category[];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private categoryService: CategoryService,
              private authService: AuthService,
              private modalService: NgbModal) {
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.parent = new Category();
    this.id = this.route.snapshot.params.id;
    this.categoryService.getById(this.id).subscribe(data => {
      this.parent = data;
      this.categories = this.parent.subCategories;
    });
  }

  // tslint:disable-next-line:typedef
  goToCategories() {
    this.router.navigate(['category-list']);
  }

  // tslint:disable-next-line:typedef
  goToProductByCategory(id: number) {
    this.router.navigate(['products-category', id]);
  }

  // tslint:disable-next-line:typedef
  deleteCategory(id: number) {
    this.categoryService.delete(id).subscribe(data => {
      this.getCategories();
    });
  }

  // tslint:disable-next-line:typedef
  editCategory(id: number) {
    this.router.navigate(['category-edit', id]);
  }

  // tslint:disable-next-line:typedef
  hasRole(role: string) {
    this.boolean = this.authService.hasRole(role);
    if (!this.boolean) {
      this.router.navigate(['products']);
    }
    return this.boolean;
  }

  // tslint:disable-next-line:typedef
  getCategories() {
    this.allCategories = [];
    this.categoryService.findAllParentNull().subscribe(data => {
      this.allCategories = data;
    });
  }

  // tslint:disable-next-line:typedef
  open(content, id) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.deleteCategory(id);
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
