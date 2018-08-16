import { Component, OnInit, Input, Injectable } from '@angular/core';
import { TableService } from '../services/table.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
 

export class TableComponent implements OnInit {
  @Input() number: number;

  table = { }

  message : string;

  constructor(private tableService : TableService, private data: DataService) {
    this.number = this.number;
    this.data = data;
  }

  ngOnInit() {
    this.table = this.tableService.getTable(this.number);
  }

  numberTable(num: number) {
   this.data.setNumTable(num);
  }
}
