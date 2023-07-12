import { Injectable, signal } from '@angular/core';
import { User } from '../shared/models/user';



@Injectable({
  providedIn: 'root'
})
export class SignalService {
  public count = signal<number>(0);
  public dbBase: User[] = [
    { nome: 'vini', email: 'vini@gmail.com' }
  ]
  public element = signal(this.dbBase);

  constructor() { }

  setCount(value: number) {
    this.count.set(value);
  }

  getCount() {
    this.count.update((value) => {
      return value + 1;
    })
  }



}
