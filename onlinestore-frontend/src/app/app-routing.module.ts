import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegisterComponent} from './users/components/register/register.component';
import {CategoryFormComponent} from './categories/components/category-form/category-form.component';
import {UserEditComponent} from './users/components/user-edit/user-edit.component';
import {ProductListComponent} from './products/components/product-list/product-list.component';
import {ProductAddComponent} from './products/components/product-add/product-add.component';
import {ProductEditComponent} from './products/components/product-edit/product-edit.component';
import {ProductViewComponent} from './products/components/product-view/product-view.component';
import {OrderListComponent} from './orders/components/order-list/order-list.component';
import {ManufacturerAddComponent} from './manufacturer/components/manufacturer-add/manufacturer-add.component';
import {ManufacturerListComponent} from './manufacturer/components/manufacturer-list/manufacturer-list.component';


const routes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path: 'view-cart', component: OrderListComponent},
  {path: 'category-add', component: CategoryFormComponent},
  {path: 'profile-edit/:id', component: UserEditComponent},
  {path: 'products', component: ProductListComponent},
  {path: 'product-add', component: ProductAddComponent},
  {path: 'product-edit', component: ProductEditComponent},
  {path: 'product-view', component: ProductViewComponent},
  {path: 'manufacturer-add', component: ManufacturerAddComponent},
  {path: 'manufacturer-list', component: ManufacturerListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
