import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../service/product.service';
import {Product} from '../model/product';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {Category} from '../../../categories/model/category';
import {Manufacturer} from '../../../manufacturer/model/manufacturer';
import {CategoryService} from '../../../categories/service/category.service';
import {ManufacturerService} from '../../../manufacturer/service/manufacturer.service';
import {AuthService} from '../../../users/service/auth.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  product: Product;
  productTypes: string[];
  selectedFiles: FileList;
  currentFile: File;
  categories: Category[];
  manufacturers: Manufacturer[];
  message = '';
  progress = 0;
  boolean: boolean;


  constructor(private route: ActivatedRoute,
              private router: Router,
              private productService: ProductService,
              private categoryService: CategoryService,
              private manufacturerService: ManufacturerService,
              private authService: AuthService) {
    this.product = new Product();
    this.categories = [];
    this.manufacturers = [];
    this.productTypes = [];

  }

  // tslint:disable-next-line:typedef
  onSubmit() {
    this.productService.save(this.product).subscribe(data => {
      this.product = data;
      this.upload();
    });
  }


  // tslint:disable-next-line:typedef
  goToProductList() {
    this.router.navigate(['/products']);
  }

  ngOnInit(): void {
    this.product = new Product();
    this.productTypes.push('PIECE');
    this.productTypes.push('KG');
    this.categoryService.findAll().subscribe(data => {
      this.categories = data;
    });
    this.manufacturerService.findAll().subscribe(data => {
      this.manufacturers = data;
    });
  }

  // tslint:disable-next-line:typedef
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  // tslint:disable-next-line:typedef
  upload() {
    this.progress = 0;
    this.currentFile = this.selectedFiles.item(0);
    this.productService.upload(this.currentFile).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.message = event.body.message;
          const a = event.body.id;
        }
        this.goToProductList();
      },
      err => {
        this.progress = 0;
        this.message = 'Could not upload the file!';
        this.currentFile = undefined;
        this.goToProductList();
      });

    this.selectedFiles = undefined;
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
