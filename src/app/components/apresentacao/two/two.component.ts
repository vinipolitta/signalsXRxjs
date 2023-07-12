import { Component, effect } from '@angular/core';
import { SignalService } from 'src/app/service/signal.service';

@Component({
  selector: 'app-two',
  templateUrl: './two.component.html',
  styleUrls: ['./two.component.scss']
})
export class TwoComponent {
  count: number;
  constructor(private signalService: SignalService) {
    effect(() => {
      console.log('Recebendo do component ONE', this.signalService.count(),
        this.count = this.signalService.count()

      );
    })
  }

  changeCount() {
    this.signalService.count.set(4444444444444)
  }

}
