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

  message: string;
  busy: string;

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
    this.listDishService.OnArrayUpdated.subscribe(c => {
      this.busy = c.map(d => d.Table).indexOf(this.table.Number) > -1 ? 'busy': '';
    });
  }

  numberTable(num: number) {
    console.log(num);
    this.data.setNumTable(num);
  }
}
