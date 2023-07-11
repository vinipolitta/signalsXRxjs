import { Component, OnInit, computed, effect, signal } from '@angular/core';

@Component({
  selector: 'app-signals',
  templateUrl: './signals.component.html',
  styleUrls: ['./signals.component.scss']
})
export class SignalsComponent implements OnInit {

  public contador = signal(10);
  public contador2 = signal(10);

  public somaContator = computed(() => this.contador() + this.contador2())
  public dobroContator = computed(() => this.contador() * 2);

  public effect = effect(() => console.log(`Mudança no estado do contador: ${this.contador()},
  e do contador2: ${this.contador2()}`));

  constructor() {
  }

  ngOnInit(): void {
    this.logSingnal()
    this.effect;

  }

  public signalChanges() {
    this.contador.set(15);
  }


  public logSingnal() {
    console.log('signals')
    console.log(this.contador(), this.contador2(), this.somaContator(), this.dobroContator())

  }

}
