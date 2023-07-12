import { Component, effect } from '@angular/core';
import { SignalService } from 'src/app/service/signal.service';

@Component({
  selector: 'app-apresentacao',
  templateUrl: './apresentacao.component.html',
  styleUrls: ['./apresentacao.component.scss']
})
export class ApresentacaoComponent {
  public count: number;

  constructor(private signalService: SignalService) {
    effect(() => {
      console.log('Recebendo do component app principaç', this.signalService.count(),
        this.count = this.signalService.count()
      );
    })
  }

}
