import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Subject } from 'rxjs';
@Injectable()
export class DataService {

  private messageSource = new BehaviorSubject("default message");
  currentMessage = this.messageSource.asObservable();

  private state = new Subject<number>();

  constructor() { }

  numTable: number = 0;

  setNumTable(number: number) {
    this.numTable = number;
  }

  getNumTable() {
    return this.numTable;
  }
}
