import { Component, OnInit, Input } from '@angular/core';
import { IOrder } from 'src/app/models/order';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-table-order',
  templateUrl: './table-order.component.html',
  styleUrls: ['./table-order.component.css']
})
export class TableOrderComponent implements OnInit {
  @Input() number;
  order: IOrder;

  constructor(private store: Store<IAppState>) { }

  // Добавить мердж заказа по примеру списка заказов!
  ngOnInit() {
    this.store.select(c => c.orders.orders.find(o => o.Table == this.number)).subscribe(c => this.order = c);
  }
}
