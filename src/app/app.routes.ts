import { Routes } from '@angular/router';
import { AdministrationComponent } from './components/administration/administration.component';
import { BarComponent } from './components/bar/bar.component';
import { DishListComponent } from './components/dish-list/dish-list.component';
import { ForgotComponent } from './components/forgot/forgot.component';
import { Hall1Component } from "./components/hall1/hall1.component";
import { Hall2Component } from './components/hall2/hall2.component';
import { KitchenComponent } from './components/kitchen/kitchen.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './store/auth/auth.Guard';

// определение маршрутов
export const ROUTES: Routes = [
  { path: '', component: Hall1Component, canActivate: [AuthGuard], data: { roles: ['Admin', 'Waiter', 'Bartender']} },
  { path: 'hall-2', component: Hall2Component, canActivate: [AuthGuard], data: { roles: ['Admin', 'Waiter', 'Bartender']} },
  { path: 'kitchen', component: KitchenComponent, canActivate: [AuthGuard], data: { roles: ['Admin', 'Cook']}},
  { path: 'bar', component: BarComponent, canActivate: [AuthGuard], data: { roles: ['Admin', 'Bartender']} },
  { path: 'admin', component: AdministrationComponent, canActivate: [AuthGuard], data: { roles: ['Admin']} },
  { path: 'login', component: LoginComponent },
  { path: 'forgot', component: ForgotComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dishes', component: DishListComponent, canActivate: [AuthGuard], data: { roles: ['Admin', 'Waiter', 'Bartender', 'Cook']} },
  { path: 'order/:id', component: DishListComponent, canActivate: [AuthGuard], data: { roles: ['Admin', 'Waiter', 'Bartender', 'Cook']} },
  { path: '**', redirectTo: '' }
];
