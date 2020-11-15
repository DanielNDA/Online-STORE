import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryService} from '../../service/category.service';
import {Category} from '../../model/category';
import {ProductService} from '../../../products/components/service/product.service';
import {AuthService} from '../../../users/service/auth.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  parents: Category[] = [];
  subCategories: Category[] = [];
  config = {
    itemsPerPage: 6,
    currentPage: 1
  };
  searchValue = '';
  boolean: boolean;
  closeResult = '';

  constructor(private route: ActivatedRoute,
              private router: Router,
              private categoryService: CategoryService,
              private productService: ProductService,
              private authService: AuthService,
              private modalService: NgbModal) {
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

  // tslint:disable-next-line:typedef
  deleteCategory(id: number) {
    this.categoryService.delete(id).subscribe(data => {
      this.getCategories();
    });
  }

  // tslint:disable-next-line:typedef
  addNewCategory() {
    this.router.navigate(['category-add']);
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
  viewSubCategories(id: number) {
    this.router.navigate(['subcategories-category', id]);
  }

  // tslint:disable-next-line:typedef
  addCategory() {
    this.router.navigate(['category-add']);
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
