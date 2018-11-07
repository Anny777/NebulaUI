import { Component, OnInit, Input } from "@angular/core";
import { TableService } from "../../services/table.service";
import { DataService } from "../../services/data.service";
import { ListDishService } from "../../services/dish-order.service";
import { DishState } from "src/app/model/enum-dishState";

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.css"]
})
export class TableComponent implements OnInit {
  @Input() number: number;
  table: any = {};

  constructor(
    private tableService: TableService,
    private data: DataService,
    private listDishService: ListDishService
  ) {
    this.number = this.number;
    this.data = data;

  }

  ngOnInit() {
    this.table = this.tableService.getTable(this.number);
    this._setBusy(this.listDishService.openOrders, this.table);
    this.listDishService.OnArrayUpdated.subscribe(r => {
      console.log('loaded', r);
      this._setBusy(r, this.table);
    });
    this.listDishService.init();
  }

  numberTable(num: number) {
    this.data.setNumTable(num);
  }

  private _setBusy(orders, table) {
    table.busy = orders.map(d => d.Table).indexOf(table.Number) > -1;
    try {
      var o = orders.filter(c => c.Table == table.Number);
      table.readyDishesCount = o[0]
        .Dishes.filter(c => c.State == DishState.Ready).length;
    } catch (error) {
      table.readyDishesCount = 0;
    }
  }
}
