import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {UserEditComponent} from './users/components/user-edit/user-edit.component';
import {RegisterComponent} from './users/components/register/register.component';
import {FormsModule} from '@angular/forms';
<<<<<<< Updated upstream
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {OrderListComponent} from './orders/components/order-list/order-list.component';
=======
import {HttpClientModule} from '@angular/common/http';
import {OrderComponent} from './orders/components/order/order.component';
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
import {UserViewComponent} from './users/components/user-view/user-view.component';
import {CategoryEditComponent} from './categories/components/category-edit/category-edit.component';
import {LoginComponent} from './users/components/login/login.component';
import {UserService} from './users/service/user.service';
import {OrderService} from './orders/service/order.service';
import {ProductService} from './products/components/service/product.service';
import {RoleFormComponent} from './security/roles/components/role-form/role-form.component';
import {RoleEditComponent} from './security/roles/components/role-edit/role-edit.component';
import {RoleListComponent} from './security/roles/components/role-list/role-list.component';
import {RolePrivilegesComponent} from './security/roles/components/role-privileges/role-privileges.component';
import {RoleUsersComponent} from './security/roles/components/role-users/role-users.component';
import {PrivilegeListComponent} from './security/privileges/components/privilege-list/privilege-list.component';
import {HttpInterceptorService} from './users/service/http-interceptor.service';
import {PrivilegeEditComponent} from './security/privileges/components/privilege-edit/privilege-edit.component';
import {PrivilegeFormComponent} from './security/privileges/components/privilege-form/privilege-form.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
=======
import {NgxPaginationModule} from 'ngx-pagination';
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
    CategoryListComponent,
    UserViewComponent,
    CategoryEditComponent,
    LoginComponent,
    RoleFormComponent,
    RoleEditComponent,
    RoleListComponent,
    RolePrivilegesComponent,
    RoleUsersComponent,
    PrivilegeEditComponent,
    PrivilegeFormComponent,
    PrivilegeListComponent,
    AdminPanelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [OrderService, ProductService, UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }],
=======
    CategoryListComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgbModule,
        FormsModule,
        HttpClientModule,
        NgxPaginationModule,
    ],
  providers: [],
>>>>>>> Stashed changes
  bootstrap: [AppComponent]
})
export class AppModule {
}
