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


const routes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path: 'view-cart', component: OrderListComponent},
  {path: 'category-add', component: CategoryFormComponent},
  {path: 'profile-edit/:id', component: UserEditComponent},
  {path: 'products', component: ProductListComponent},
  {path: 'product-add', component: ProductAddComponent},
  {path: 'product-edit', component: ProductEditComponent},
  {path: 'product-view', component: ProductViewComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
