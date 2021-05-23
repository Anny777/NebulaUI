import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { IAppState } from './store/app.state';
import { tap } from 'rxjs/operators';
import { IOrderState } from './store/order/order.Reducer';
import { loadOrders } from './store/order/order.Actions';
import { IAuthState } from './store/Auth/auth.Reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Nebula';
  isSoundActivated$: Observable<boolean[]>;
  id;

  constructor(
    private appState: Store<IAppState>,
    private ordersState: Store<IOrderState>,
    private authState: Store<IAuthState>) { }

  ngOnDestroy(): void {
    if (this.id) {
      clearInterval(this.id);
    }
  }

  ngOnInit(): void {
    this.isSoundActivated$ = this.appState.select(c => c.orders.isSoundActivated).pipe(tap(c => console.log(c)));
    this.id = setInterval(() => {
      if (this.authState.select(s => s.accessToken)) {
        this.ordersState.dispatch(loadOrders());
      }
    }, 5000);
  }

  onCompleted() {
    // this.store.dispatch(new OrderActions.CleanUpAudio())
  }
}

