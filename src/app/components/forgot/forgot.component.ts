import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IOrder } from '../../models/order';
import { AppState } from 'src/app.state';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {
orders$: Observable<IOrder[]>
  constructor(private store: Store<AppState>) {
    this.orders$ = store.select("orders");
  }

  ngOnInit() {
  }

}
