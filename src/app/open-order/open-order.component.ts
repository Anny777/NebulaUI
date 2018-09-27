import { Component, OnInit } from '@angular/core';
import { OrderViewModel } from '../model/orderViewModel';
import { ListDishService } from '../services/dish-order.service';

@Component({
  selector: 'app-open-order',
  templateUrl: './open-order.component.html',
  styleUrls: ['./open-order.component.css']
})
export class OpenOrderComponent implements OnInit {

  arrayOrders: Array<OrderViewModel>;
  constructor(private listDish: ListDishService) { }

  ngOnInit() {

  }

  public getOrders() {
    this.arrayOrders = this.listDish.orders;
    return this.arrayOrders;
  }
}
