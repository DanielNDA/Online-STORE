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
import {UserViewComponent} from './users/components/user-view/user-view.component';
import {CategoryEditComponent} from './categories/components/category-edit/category-edit.component';


const routes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path: 'view-cart', component: OrderListComponent},
  {path: 'category-add', component: CategoryFormComponent},
  {path: 'category-edit/:id', component: CategoryEditComponent},
  {path: 'profile-edit/:id', component: UserEditComponent},
  {path: 'products', component: ProductListComponent},
  {path: 'product-add', component: ProductAddComponent},
  {path: 'product-edit', component: ProductEditComponent},
  {path: 'product-view', component: ProductViewComponent},
  {path: 'view-profile/:id', component: UserViewComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
