import { Component, OnInit, Input } from '@angular/core';
import { ListDishService } from '../../services/order.service';
import { DishViewModel } from '../../model/dishViewModel';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dish-list',
  templateUrl: './dish-list.component.html',
  styleUrls: ['./dish-list.component.css']
})
export class DishListComponent implements OnInit {

  constructor(private listServices: ListDishService, private data: DataService, private router: Router) {
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
    if(!this.numberTable)
    {
      this.router.navigate(['/'])
    }

    this.response(this.listServices.openOrders);
  }
  resp(r: any) {
    this.isLoading = false;
    this.list = r;
  }

  response(result:any){
    console.log('response');
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
    console.log('addDish');
    this.orderArray.push(dish);
    if (this.orderArray.length > 0) {
      this.isView = true;
    }
  }
}



