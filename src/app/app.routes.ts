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
import { AuthGuardService } from './services/auth-guard.service';

// определение маршрутов
export const ROUTES: Routes = [
  { path: '', component: Hall1Component, canActivate: [AuthGuardService], data: { roles: ['Admin', 'Waiter', 'Bartender']} },
  { path: 'hall-2', component: Hall2Component, canActivate: [AuthGuardService], data: { roles: ['Admin', 'Waiter', 'Bartender']} },
  { path: 'kitchen', component: KitchenComponent, canActivate: [AuthGuardService], data: { roles: ['Admin', 'Cook']}},
  { path: 'bar', component: BarComponent, canActivate: [AuthGuardService], data: { roles: ['Admin', 'Bartender']} },
  { path: 'admin', component: AdministrationComponent, canActivate: [AuthGuardService], data: { roles: ['Admin']} },
  { path: 'login', component: LoginComponent },
  { path: 'forgot', component: ForgotComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dishes', component: DishListComponent, canActivate: [AuthGuardService], data: { roles: ['Admin', 'Waiter', 'Bartender', 'Cook']} },
  { path: 'order/:id', component: DishListComponent, canActivate: [AuthGuardService], data: { roles: ['Admin', 'Waiter', 'Bartender', 'Cook']} },
  { path: '**', redirectTo: '' }
];
