import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng6-toastr';

@Component({
  selector: 'app-hall1',
  templateUrl: './hall1.component.html',
  styleUrls: ['./hall1.component.css']
})
export class Hall1Component implements OnInit {

  constructor(private router: Router, public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
  }
  toast(){
    this.toastr.success('You are awesome!', 'Success!');
  }
}
