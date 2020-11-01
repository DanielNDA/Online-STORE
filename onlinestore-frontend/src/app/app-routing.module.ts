import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegisterComponent} from './users/components/register/register.component';
import {CategoryFormComponent} from './categories/components/category-form/category-form.component';
import {UserEditComponent} from './users/components/user-edit/user-edit.component';
import {ProductListComponent} from './products/components/product-list/product-list.component';
import {ProductAddComponent} from './products/components/product-add/product-add.component';
import {ProductEditComponent} from './products/components/product-edit/product-edit.component';
import {ProductViewComponent} from './products/components/product-view/product-view.component';
import {UserViewComponent} from './users/components/user-view/user-view.component';
import {CategoryEditComponent} from './categories/components/category-edit/category-edit.component';
import {CategoryListComponent} from './categories/components/category-list/category-list.component';
import {LoginComponent} from './users/components/login/login.component';
import {AuthGuardService} from './users/service/auth-guard.service';
import {AdminPanelComponent} from './admin/admin-panel/admin-panel.component';
import {OrderComponent} from './orders/components/order/order.component';
import {ManufacturerAddComponent} from './manufacturer/components/manufacturer-add/manufacturer-add.component';
import {ManufacturerListComponent} from './manufacturer/components/manufacturer-list/manufacturer-list.component';
import {ProductsCategoryComponent} from './products/components/products-category/products-category.component';
import {OrderAddComponent} from './orders/components/order-add/order-add.component';
import {OrderUsersComponent} from './orders/components/order-users/order-users.component';
import {CategorySubcategoriesComponent} from './categories/components/category-subcategories/category-subcategories.component';

const routes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'view-cart', component: OrderComponent, canActivate: [AuthGuardService]},
  {path: 'category-add', component: CategoryFormComponent, canActivate: [AuthGuardService]},
  {path: 'category-edit/:id', component: CategoryEditComponent, canActivate: [AuthGuardService]},
  {path: 'category-list', component: CategoryListComponent, canActivate: [AuthGuardService]},
  {path: 'profile-edit/:id', component: UserEditComponent, canActivate: [AuthGuardService]},
  {path: 'products', component: ProductListComponent, canActivate: [AuthGuardService]},
  {path: 'product-add', component: ProductAddComponent, canActivate: [AuthGuardService]},
  {path: 'product-edit/:id', component: ProductEditComponent, canActivate: [AuthGuardService]},
  {path: 'product-view', component: ProductViewComponent, canActivate: [AuthGuardService]},
  {path: 'view-profile/:id', component: UserViewComponent, canActivate: [AuthGuardService]},
  {path: 'administrator-panel', component: AdminPanelComponent, canActivate: [AuthGuardService]},
  {path: 'manufacturer-add', component: ManufacturerAddComponent, canActivate: [AuthGuardService]},
  {path: 'manufacturer-list', component: ManufacturerListComponent, canActivate: [AuthGuardService]},
  {path: 'products-category/:id', component: ProductsCategoryComponent, canActivate: [AuthGuardService]},
  {path: 'order-details/:id', component: OrderAddComponent, canActivate: [AuthGuardService]},
  {path: 'order-history', component: OrderUsersComponent, canActivate: [AuthGuardService]},
  {path: 'subcategories-category/:id', component: CategorySubcategoriesComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
