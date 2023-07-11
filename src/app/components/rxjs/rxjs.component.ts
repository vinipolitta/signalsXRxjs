import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, map, take, tap } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.scss']
})
export class RxjsComponent implements OnInit {
  public contador$ = new BehaviorSubject(10);
  public dobroContator$ = this.contador$.pipe(map(value => value * 2))
  public contador2$ = new BehaviorSubject(10);
  public effect$ = combineLatest([this.contador$, this.contador2$])

    .subscribe(([contador1, contador2]) => {
      console.log(`Contador$: ${contador1}, Contador2$: ${contador2}`);

    })


  public somaContator$ = combineLatest([this.contador$, this.contador2$])
    .pipe(
      tap(console.log),
      map(([contador1, contador2]) => contador1 + contador2)
    );

  constructor() {
    this.effect$

  }


  ngOnInit(): void {
    this.logRxjs();
  }

  public rxjsChanges() {
    this.contador$.next(25);
  }

  public logRxjs() {
    console.log('Rxjs');

    this.somaContator$
      .pipe(take(2))
      .subscribe((valor) => console.log(this.contador$.value, this.contador2$.value, 'soma:', valor));



  }
}
