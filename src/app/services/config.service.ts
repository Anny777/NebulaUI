import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() { }

  // public host = 'http://api.vip-33.ru/';
  public host = 'http://localhost:62679/';

}
