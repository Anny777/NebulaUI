import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Pipe } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatInput, MatFormField,  MatIconModule, MatIcon, MatProgressSpinnerModule } from '@angular/material';

import { AppComponent } from './app.component';
import { Hall1Component } from './hall1/hall1.component';
import { Hall2Component } from './hall2/hall2.component';
import { KitchenComponent } from './kitchen/kitchen.component';
import { HttpClientModule } from '@angular/common/http';

import { BarComponent } from './bar/bar.component';
import { AdministrationComponent } from './administration/administration.component';
import { TableComponent } from './table/table.component';
import { TableService } from './services/table.service';
import { DishListComponent } from './dish-list/dish-list.component';
import { ListDishService } from './services/dish-order.service';
import { FilterPipeComponent } from './filter-pipe/filter-pipe.component';
import { FormsModule } from '@angular/forms';
import { OrderlistComponent } from './orderlist/orderlist.component';
import { DataService } from './services/data.service';
import { OpenOrderComponent } from './open-order/open-order.component';
import {NgPipesModule} from 'ngx-pipes';
import {Ng2FilterPipeModule} from 'ng2-filter-pipe';
import { GroupByPipe } from './filter-pipe/groupBy-pipe';
import { CookingComponent } from './cooking/cooking.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotComponent } from './forgot/forgot.component';


// определение маршрутов
const appRoutes: Routes = [
  { path: '', component: Hall1Component },
  { path: 'hall-2', component: Hall2Component },
  { path: 'kitchen', component: KitchenComponent },
  { path: 'bar', component: BarComponent },
  { path: 'admin', component: AdministrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dishes', component: DishListComponent},
  { path: 'orders', component: OpenOrderComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    Hall1Component,
    Hall2Component,
    KitchenComponent,
    BarComponent,
    AdministrationComponent,
    TableComponent,
    DishListComponent,
    FilterPipeComponent,
    GroupByPipe,
    OrderlistComponent,
    OpenOrderComponent,
    CookingComponent,
    MatInput,
    LoginComponent,
    RegisterComponent,
    MatFormField
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    FormsModule,
    NgPipesModule,
    Ng2FilterPipeModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  providers: [TableService, ListDishService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
