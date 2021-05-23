import { Component, OnInit, Input } from "@angular/core";
import { ITable } from "src/app/models/table";
import { Store } from "@ngrx/store";
import { IAppState } from "src/app/store/app.state";
import { map, tap } from "rxjs/operators";
import { TableService } from 'src/app/services/table.service';
import { IOrderState } from 'src/app/store/order/order.Reducer';
import { pipe } from 'rxjs';

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.css"]
})
export class TableComponent implements OnInit {
  @Input() number: number;
  table: ITable;
  constructor(
    private store: Store<IAppState>,
    private tableService: TableService
  ) { }

  ngOnInit() {
    this.table = this.tableService.getTable(this.number);
    this.store
      .select(s => s.orders)
      .subscribe(ordersState => {
        this.table.busy = ordersState?.orders && ordersState.orders.some(o => o.tableNumber == this.table.number);
        console.log(ordersState.orders, ordersState.orders.some(o => o.tableNumber == this.table.number))
      });
  }
}
