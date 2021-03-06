import { Component, OnInit, Input } from "@angular/core";
import { ITable } from "src/app/models/table";
import { Store } from "@ngrx/store";
import { IAppState } from "src/app/store/app.state";
import { TableService } from 'src/app/services/table.service';

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
        const order = ordersState?.orders.find(o => o.tableNumber == this.table.number)
        this.table.busy = !!order;
        this.table.readyDishesCount = order?.readyDishesCount;
        this.table.orderId = order?.id;
      });
  }
}
