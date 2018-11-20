import { Component, OnInit } from '@angular/core';
import { OrderViewModel } from '../../model/orderViewModel';
import { OrderService } from '../../services/order.service';
import { DishViewModel } from '../../model/dishViewModel';

@Component({
  selector: 'app-open-order',
  templateUrl: './open-order.component.html',
  styleUrls: ['./open-order.component.css']
})
export class OpenOrderComponent implements OnInit {

  arrayOrders: Array<OrderViewModel>;
  isLoading: boolean = true;

  constructor(private dishService: OrderService) { }

  ngOnInit() {
  }

  public getOrders() {
   return this.dishService.openOrders;
  }

  public groupByNameDishes(dishes: DishViewModel[]) {
    var result = [];
    for (let index = 0; index < dishes.length; index++) {
      const element = dishes[index];
      var io = result.map(c => c.key.Id).indexOf(element.Id);
      if (~io) {
        result[io].value.push(element);
      } else {
        result.push({ key: element, value: [element] });
      }
    }
    return result;
  }

  public getTotal(_array: DishViewModel[]) {
    return this.dishService.getTotalDish(_array);
  }

  public closeOrder(table:number) {
    this.isLoading = false;
    this.dishService.closeOrder(table, r => this.isLoading = r);
  }
}
