import { Component, OnInit, Input } from '@angular/core';
import { ListDishService } from '../services/dish-order.service';

@Component({
  selector: 'app-cooking',
  templateUrl: './cooking.component.html',
  styleUrls: ['./cooking.component.css']
})
export class CookingComponent implements OnInit {

  arrayOrders = [];
  constructor(private listDish: ListDishService) { }

  ngOnInit() {
    this.listDish.OnArrayUpdated.subscribe(r => this.responce(r));
  }
  responce(r: any) {
    this.arrayOrders = r;
    console.log(this.arrayOrders);
  }

}
