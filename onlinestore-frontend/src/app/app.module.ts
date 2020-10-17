import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserEditComponent } from './users/components/user-edit/user-edit.component';
import { RegisterComponent } from './users/components/register/register.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {OrderListComponent} from './orders/components/order-list/order-list.component';
import {OrderAddComponent} from './orders/components/order-add/order-add.component';
import {OrderUsersComponent} from './orders/components/order-users/order-users.component';
import {ProductAddComponent} from './products/components/product-add/product-add.component';
import {ProductEditComponent} from './products/components/product-edit/product-edit.component';
import {ProductListComponent} from './products/components/product-list/product-list.component';
import {ProductViewComponent} from './products/components/product-view/product-view.component';
import { CategoryFormComponent } from './categories/components/category-form/category-form.component';

// @ts-ignore
import { ManufacturerComponent } from './manufacturer/components/manufacturer/manufacturer.component';
import { ManufacturerListComponent } from './manufacturer/components/manufacturer-list/manufacturer-list.component';
import { ManufacturerAddComponent } from './manufacturer/components/manufacturer-add/manufacturer-add.component';
import { HomeComponent } from './common/home/home.component';
import { NavbarComponent } from './common/navbar/navbar.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { FooterComponent } from './common/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    UserEditComponent,
    RegisterComponent,
    OrderListComponent,
    OrderAddComponent,
    OrderUsersComponent,
    ProductAddComponent,
    ProductEditComponent,
    ProductListComponent,
    ProductViewComponent,
    CategoryFormComponent,
    ManufacturerComponent,
    ManufacturerListComponent,
    ManufacturerAddComponent,
    HomeComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
