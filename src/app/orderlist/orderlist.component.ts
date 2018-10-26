import { Component, OnInit, Input } from '@angular/core';
import { OrderViewModel } from '../model/orderViewModel';
import { ListDishService } from '../services/dish-order.service';
import { DishViewModel } from '../model/dishViewModel';

@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.css']
})
export class OrderlistComponent implements OnInit {

  constructor(private dishOrderService: ListDishService) { }

  @Input() _array : Array<DishViewModel>;
  @Input() view: boolean;
  @Input() numberTable: number;
  @Input() numberCustom: number;

  isLoading: boolean = false;

  ngOnInit() {
  }

  public sendOrder() {
    this.isLoading = true;
    var mas = new OrderViewModel();
    mas.Dishes = this._array;
    mas.Table = this.numberTable;
    mas.Id = this.numberCustom;
    mas.CreatedDate = new Date();
    this.dishOrderService.createNewOrder(mas, r => console.log());
  }

  public clearOrder(){
    this._array = this._array.filter(c => c.State > 0);
  }

  public getTotal() {
  return this.dishOrderService.getTotalDish(this._array);
  }

  public groupById() {
    console.log('groupbyid');
    var result = [];
    for (let index = 0; index < this._array.length; index++) {
      const element = this._array[index];
      var io = result.map(c => c.key.Id).indexOf(element.Id);
      if (~io) {
        result[io].value.push(element);
      } else {
        result.push({ key: element, value: [element] });
      }
    }
    return result;
  }



  change(increased: boolean, dish: any) {
    if (increased == true) {
      this._array.push(dish.key);
    }
    else{
      var indx = this._array.map(c => c.Id).lastIndexOf(dish.key.Id);
      this._array.splice(indx,1);
    }
  }
}

