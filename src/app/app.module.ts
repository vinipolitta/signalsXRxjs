import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignalsComponent } from './components/signals/signals.component';
import { RxjsComponent } from './components/rxjs/rxjs.component';

@NgModule({
  declarations: [
    AppComponent,
    SignalsComponent,
    RxjsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
