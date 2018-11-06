import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { ListDishService } from '../../services/dish-order.service';

@Component({
  selector: 'app-hall1',
  templateUrl: './hall1.component.html',
  styleUrls: ['./hall1.component.css']
})
export class Hall1Component implements OnInit {

  constructor(private router: Router, private listDish: ListDishService) {
  }

  ngOnInit() {
  }

}
