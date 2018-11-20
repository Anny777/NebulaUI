import { Component, OnInit, Input } from "@angular/core";
import { TableService } from "../../services/table.service";
import { OrderService } from "../../services/order.service";
import { DishState } from "src/app/model/enum-dishState";
import { ITable } from "src/app/models/table";
import { IOrder } from "src/app/models/order";

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
    private listDishService: OrderService
  ) { }

  ngOnInit() {
    this.table = this.tableService.getTable(this.number);
    // this._setBusy(this.listDishService.openOrders, this.table);
    this.listDishService.OnArrayUpdated.subscribe(r => {
      console.log('loaded', r);
      this._setBusy(r, this.table);
    });
    this.listDishService.init();
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
