import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng6-toastr';
import { ListDishService } from '../services/dish-order.service';

@Component({
  selector: 'app-hall1',
  templateUrl: './hall1.component.html',
  styleUrls: ['./hall1.component.css']
})
export class Hall1Component implements OnInit {

  constructor(private router: Router, private listDish: ListDishService, public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.listDish.OnDishReady.subscribe(r =>  this.response(r));
  }

  public response(dish: any){
    console.log(dish);
    this.toastr.success(dish.Name + "Стол № " + dish.Table, 'Готово!');
  }
}
