import { Component, OnInit, computed, effect, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  public form: FormGroup;
  public colunaTabela = ['Nome', 'E-mail', 'Options']


  constructor(private fb: FormBuilder) {


    effect(() => {
      this.saveUsersInStorage();
    });
  }


  users = signal<User[]>(this.getUsersFromStorage());

  ngOnInit(): void {
    this.formulario()
    console.log(this.users());

  }

  public formulario() {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      email: ['', Validators.required],
    })
  }

  addUser() {
    if (this.form.invalid) {
      return;
    }

    this.users.update((users) => {
      const userCreate = this.form.value as User;

      const newUser: User = { nome: userCreate.nome, email: userCreate.email, newUser: userCreate.newUser };

      return [...users, newUser];
    });

    this.form.reset();
  }

  removeUser(user: User) {
    this.users.mutate((users) => {
      const userIndex = users.indexOf(user);
      users.splice(userIndex, 1);
    });
  }

  saveUsersInStorage() {
    if (this.users()) {
      window.localStorage.setItem("user", JSON.stringify(this.users()));
    }
  }


  public getUsersFromStorage() {
    return JSON.parse((window.localStorage.getItem("users") as string) || "[]");
  }

}
