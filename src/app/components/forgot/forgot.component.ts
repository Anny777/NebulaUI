import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IOrder } from '../../models/order';
import { IAppState } from '../../store/app.state';
import { Store } from '@ngrx/store';
import * as OrderActions from '../../store/actions/orderActions';
import * as DisheActions from '../../store/actions/dishActions';
import { tap } from 'rxjs/operators';
import { IDish } from 'src/app/models/dish';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {
orders$: Observable<IOrder[]>;
isOrdersLoading$: Observable<boolean>;
dishes$: Observable<IDish[]>;
  constructor(private store: Store<IAppState>) {
  }

  ngOnInit() {
    this.orders$ = this.store.select(c=>c.orders.orders).pipe(tap(orders => console.log(orders)));
    this.isOrdersLoading$ = this.store.select(c=>c.orders.isOrdersLoading).pipe(tap(isloading => console.log('isloading:',isloading)));

    this.dishes$ = this.store.select(c => c.dishes.dishes);
    // this.store.dispatch(new DisheActions.LoadDish());
  }
 refresh(){
  this.store.dispatch(new OrderActions.LoadOrders());

 }
}
