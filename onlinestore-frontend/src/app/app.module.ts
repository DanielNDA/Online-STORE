import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {UserEditComponent} from './users/components/user-edit/user-edit.component';
import {RegisterComponent} from './users/components/register/register.component';
import {FormsModule} from '@angular/forms';

import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {HttpClientModule} from '@angular/common/http';
import {OrderComponent} from './orders/components/order/order.component';

import {OrderAddComponent} from './orders/components/order-add/order-add.component';
import {OrderUsersComponent} from './orders/components/order-users/order-users.component';
import {ProductAddComponent} from './products/components/product-add/product-add.component';
import {ProductEditComponent} from './products/components/product-edit/product-edit.component';
import {ProductListComponent} from './products/components/product-list/product-list.component';
import {ProductViewComponent} from './products/components/product-view/product-view.component';
import {CategoryFormComponent} from './categories/components/category-form/category-form.component';
import {HomeComponent} from './common/home/home.component';
import {NavbarComponent} from './common/navbar/navbar.component';
import {FooterComponent} from './common/footer/footer.component';
import {CategoryListComponent} from './categories/components/category-list/category-list.component';

import {UserViewComponent} from './users/components/user-view/user-view.component';
import {CategoryEditComponent} from './categories/components/category-edit/category-edit.component';
import {LoginComponent} from './users/components/login/login.component';
import {UserService} from './users/service/user.service';
import {OrderService} from './orders/service/order.service';
import {ProductService} from './products/components/service/product.service';
import {HttpInterceptorService} from './users/service/http-interceptor.service';
import {AdminPanelComponent} from './admin/admin-panel/admin-panel.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {ManufacturerAddComponent} from './manufacturer/components/manufacturer-add/manufacturer-add.component';
import {ManufacturerListComponent} from './manufacturer/components/manufacturer-list/manufacturer-list.component';
import {ProductsCategoryComponent} from './products/components/products-category/products-category.component';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {DatePipe} from '@angular/common';
import { SidebarComponent } from './common/sidebar/sidebar/sidebar.component';
import {RouteReuseStrategy} from '@angular/router';
import { CategorySubcategoriesComponent } from './categories/components/category-subcategories/category-subcategories.component';

@NgModule({
  declarations: [
    AppComponent,
    UserEditComponent,
    RegisterComponent,
    OrderComponent,
    OrderAddComponent,
    OrderUsersComponent,
    ProductAddComponent,
    ProductEditComponent,
    ProductListComponent,
    ProductViewComponent,
    CategoryFormComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    CategoryListComponent,
    UserViewComponent,
    CategoryEditComponent,
    LoginComponent,
    AdminPanelComponent,
    ManufacturerAddComponent,
    ManufacturerListComponent,
    ProductsCategoryComponent,
    SidebarComponent,
    CategorySubcategoriesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    Ng2SearchPipeModule
  ],
  providers: [OrderService, ProductService, UserService, DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
