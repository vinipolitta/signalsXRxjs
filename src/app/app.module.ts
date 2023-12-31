import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignalsComponent } from './components/signals/signals.component';
import { RxjsComponent } from './components/rxjs/rxjs.component';
import { ToDoListComponent } from './components/to-do-list/to-do-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserListComponent } from './components/user-list/user-list.component';
import { ApresentacaoComponent } from './components/apresentacao/apresentacao.component';
import { OneComponent } from './components/apresentacao/one/one.component';
import { TwoComponent } from './components/apresentacao/two/two.component';

@NgModule({
  declarations: [
    AppComponent,
    SignalsComponent,
    RxjsComponent,
    ToDoListComponent,
    UserListComponent,
    ApresentacaoComponent,
    OneComponent,
    TwoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
