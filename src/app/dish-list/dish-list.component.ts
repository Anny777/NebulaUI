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
  isLoading: boolean;

  ngOnInit() {
    this.isLoading = true;
    this.listServices.getListDishes(r => this.resp(r));
    this.numberTable = this.data.getNumTable();

    this.listServices.getOpenOrder(r => this.response(r));
  }
  resp(r: any) {
    this.isLoading = false;
    this.list = r;
  }

  response(result:any){
   for (let index = 0; index < result.length; index++) {
     const element = result[index];
     if(element.Table == this.numberTable){
       this.numberCustom = element.Id;
      this.orderArray = element.Dishes;
      this.isView = true;
     }
   }
  }

  public addDish(dish: Array<DishViewModel>) {
    this.orderArray.push(dish);
    if (this.orderArray.length > 0) {
      this.isView = true;
    }
  }
}


