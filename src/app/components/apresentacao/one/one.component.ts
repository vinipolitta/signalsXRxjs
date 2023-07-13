import { Component, OnInit, computed, effect } from '@angular/core';
import { SignalService } from 'src/app/service/signal.service';

@Component({
  selector: 'app-one',
  templateUrl: './one.component.html',
  styleUrls: ['./one.component.scss']
})
export class OneComponent implements OnInit {
  count = 1;
  public dobroCount = computed(() => this.signal.count() * 2)
  public parOuImpar = computed(() => this.signal.count() % 2 == 0 ? 'Par' : 'Impar')
  contador: number;

  constructor(public signal: SignalService) {
    effect(() => {
      console.log(`Valor inserido no component ONE: ${this.signal.count()}`,
        this.contador = this.signal.count()
      );

    })
  }
  ngOnInit(): void {
  }

  public countBtn() {
    this.signal.count.set(this.count++);
  }
}
