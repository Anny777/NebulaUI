import { Component, OnInit, Input } from "@angular/core";
import { OrderService } from "../../services/order.service";
import { IOrder } from "src/app/models/order";
import { DishState } from "src/app/models/dishState";

@Component({
  selector: "app-cooking",
  templateUrl: "./cooking.component.html",
  styleUrls: ["./cooking.component.css"]
})
export class CookingComponent implements OnInit {
  arrayOrders: Array<IOrder>;
  @Input() WorkType: number;

  isLoading: boolean;
  isSpinner: number;;

  constructor(private listDish: OrderService) { }

  ngOnInit() {
    this.isLoading = true;
    // this.arrayOrders = this.listDish.orders;
    // this.listDish.OnArrayUpdated.subscribe(r => (this.arrayOrders = r));
  }

  public filterWorkType(): IOrder[] {
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
        const orderModel = {
          Id: order.Id,
          Table: order.Table,
          Dishes: dishes,
          CreatedDate: order.CreatedDate
        }
        result.push(orderModel);

      }
      return result;
    }
  }
}
  // public ready(id: number) {
  //     this.isLoading = false;
  //   // this.listDish.setReady(id, r => this.isLoading = r);
  // }
