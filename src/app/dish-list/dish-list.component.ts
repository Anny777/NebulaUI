import { Component, OnInit, Input } from '@angular/core';
import { ListDishService } from '../services/dish-order.service';
import { DishViewModel } from '../model/dishViewModel';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dish-list',
  templateUrl: './dish-list.component.html',
  styleUrls: ['./dish-list.component.css']
})
export class DishListComponent implements OnInit {

  constructor(private listServices: ListDishService, private data: DataService) {
    this.data = data;
  }
  message: string;
  numberTable: number;
  isView: boolean;
  numberCustom: number;

  list: Array<DishViewModel>;
  orderArray = [];

  ngOnInit() {
    this.listServices.getListDishes().subscribe(r => this.resp(r));
    this.numberTable = this.data.getNumTable();
  }
  resp(r: any) {
    this.list = r;
  }

  public addDish(dish: Array<DishViewModel>) {
    this.orderArray.push(dish);
    if (this.orderArray.length > 0) {
      this.isView = true;
    }
  }
}


