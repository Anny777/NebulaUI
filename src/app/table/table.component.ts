import { Component, OnInit, Input, Injectable } from "@angular/core";
import { TableService } from "../services/table.service";
import { DataService } from "../services/data.service";
import { ListDishService } from "../services/dish-order.service";
import { OrderViewModel } from "../model/orderViewModel";

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
    this.listDishService.OnArrayUpdated.subscribe(r => this._setBusy(r, this.table));
  }

  numberTable(num: number) {
    this.data.setNumTable(num);
  }

  private _setBusy(orders, table){
    table.busy = orders.map(d => d.Table).indexOf(table.Number) > -1;
    // console.log('table ' + table.Number + ' busy=' + table.busy);
  }
}
