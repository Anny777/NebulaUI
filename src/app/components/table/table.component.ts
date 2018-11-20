import { Component, OnInit, Input } from "@angular/core";
import { TableService } from "../../services/table.service";
import { ITable } from "src/app/models/table";
import { IOrder } from "src/app/models/order";
import { Store } from "@ngrx/store";
import { IAppState } from "src/app/store/app.state";
import { tap } from "rxjs/operators";
import { DishState } from "src/app/models/dishState";

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.css"]
})
export class TableComponent implements OnInit {
  @Input() number: number;
  table: ITable;

  constructor(
    private tableService: TableService,
    private store: Store<IAppState>
  ) { }

  ngOnInit() {
    this.table = this.tableService.getTable(this.number);
    this.store
      .select(s => s.orders.orders)
      .pipe(tap(orders => this._setBusy(orders, this.table)));
  }

  private _setBusy(orders: IOrder[], table: ITable) {
    table.busy = !!orders.find(c => c.Table == table.number);
    try {
      table.readyDishesCount = orders.filter(c => c.Table == table.number)
        .reduce((p, c) =>
          c.Dishes.filter(d => d.State == DishState.Ready).length + p, 0
        );
    } catch (error) {
      table.readyDishesCount = 0;
    }
  }
}
