import { Component, OnInit, Input } from "@angular/core";
import { ListDishService } from "../services/dish-order.service";
import { OrderViewModel } from "../model/orderViewModel";
import { DishState } from "../model/enum-dishState";

@Component({
  selector: "app-cooking",
  templateUrl: "./cooking.component.html",
  styleUrls: ["./cooking.component.css"]
})
export class CookingComponent implements OnInit {
  arrayOrders: Array<OrderViewModel>;
  @Input() WorkType: number;

  constructor(private listDish: ListDishService) { }

  ngOnInit() {
    this.arrayOrders = this.listDish.orders;
    this.listDish.OnArrayUpdated.subscribe(r => (this.arrayOrders = r));
  }

  public filterWorkType(): OrderViewModel[] {
    const result = [];
    for (let i = 0; i < this.arrayOrders.length; i++) {
      const order = this.arrayOrders[i];
      const dishes = [];
      for (let j = 0; j < order.Dishes.length; j++) {
        const dish = order.Dishes[j];
        if (dish.WorkshopType == this.WorkType && ~[DishState.InWork, DishState.CancellationRequested].indexOf(dish.State)) {
          dishes.push(dish);
        }
      }
      if (dishes.length > 0) {
        const orderModel = new OrderViewModel();
        orderModel.Id = order.Id;
        orderModel.Table = order.Table;
        orderModel.Dishes = dishes;
        orderModel.CreatedDate = order.CreatedDate;

        result.push(order);
      }
    }
    return result;
  }

  public ready(id: number) {
    this.listDish.setReady(id).subscribe(result => console.log(result));
  }
}
