import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegisterComponent} from './users/components/register/register.component';
import {CategoryFormComponent} from './categories/components/category-form/category-form.component';
import {UserEditComponent} from './users/components/user-edit/user-edit.component';
import {OrderListComponent} from './orders/components/order-list/order-list.component';

const routes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path: 'view-cart', component: OrderListComponent},
  {path: 'category-add', component: CategoryFormComponent},
  {path: 'profile-edit/:id', component: UserEditComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
