import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegisterComponent} from './users/components/register/register.component';
import {CategoryFormComponent} from './categories/components/category-form/category-form.component';
import {UserEditComponent} from './users/components/user-edit/user-edit.component';
import {CategoryListComponent} from './categories/components/category-list/category-list.component';

const routes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path: 'category-add', component: CategoryFormComponent},
  {path: 'profile-edit/:id', component: UserEditComponent},
  {path: 'categories', component: CategoryListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
