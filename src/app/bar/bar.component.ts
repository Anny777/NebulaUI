import { Component, OnInit } from '@angular/core';
import { ListDishService } from '../services/dish-order.service';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css']
})
export class BarComponent implements OnInit {

  constructor(private listDish: ListDishService) { }
  
  arrayOrders = [];

  ngOnInit() {
    this.listDish.OnArrayUpdated.subscribe(r => this.responce(r));

  }
  responce(r: any) {
    this.arrayOrders = r;
  }

}
