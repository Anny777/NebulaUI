import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IOrder } from '../../models/order';
import { IAppState } from '../../store/app.state';
import { Store } from '@ngrx/store';
import * as OrderActions from '../../store/actions/orderActions'
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {
orders$: Observable<IOrder[]>
  constructor(private store: Store<IAppState>) {
  }

  ngOnInit() {
    this.orders$ = this.store.select(c=>c.orders.orders).pipe(tap(orders => console.log(orders)));
    this.store.dispatch(new OrderActions.LoadOrders())
  }

}
