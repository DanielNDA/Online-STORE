import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserEditComponent } from './users/components/user-edit/user-edit.component';
import { RegisterComponent } from './users/components/register/register.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {ProductAddComponent} from './products/components/product-add/product-add.component';
import {ProductListComponent} from './products/components/product-list/product-list.component';
import {ProductEditComponent} from './products/components/product-edit/product-edit.component';
import {ProductViewComponent} from './products/components/product-view/product-view.component';

@NgModule({
  declarations: [
    AppComponent,
    UserEditComponent,
    RegisterComponent,
    ProductAddComponent,
    ProductListComponent,
    ProductEditComponent,
    ProductViewComponent,
    OrderListComponent,
    OrderAddComponent,
    OrderUsersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
