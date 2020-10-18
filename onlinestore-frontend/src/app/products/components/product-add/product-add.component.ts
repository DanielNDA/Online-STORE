import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../service/product.service';
import {Product} from '../model/product';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {Category} from '../../../categories/model/category';
import {Manufacturer} from '../../../manufacturer/components/model/manufacturer';
import {CategoryService} from '../../../categories/service/category.service';
import {ManufacturerService} from '../../../manufacturer/components/service/manufacturer.service';

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


  constructor(private route: ActivatedRoute,
              private router: Router,
              private productService: ProductService,
              private categoryService: CategoryService,
              private manufacturerService: ManufacturerService) {
    this.product = new Product();
    this.categories = [];
    this.manufacturers = [];
    this.productTypes = [];

  }

  // tslint:disable-next-line:typedef
  onSubmit() {
    this.productService.save(this.product).subscribe(data => {
      this.upload();
      this.goToProductList();
    });
  }


  // tslint:disable-next-line:typedef
  goToProductList() {
    this.router.navigate(['/products']);
  }

  ngOnInit(): void {
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
    this.currentFile = this.selectedFiles.item(0);
    this.productService.upload(this.currentFile).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
        } else if (event instanceof HttpResponse) {
          const a = event.body.id;
        }
      },
      err => {
        this.currentFile = undefined;
      });
  }
}
