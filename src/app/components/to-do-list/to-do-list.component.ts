import { Component, computed, effect, signal } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Task } from 'src/app/shared/models/task';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss']
})
export class ToDoListComponent {
  taskControl = new FormControl("", Validators.required);
  tasks = signal<Task[]>(this.getTasksFromStorage());

  //COMPUTED UMA FUNCAO DO SIGNALS ONDE CONSEGUIMOS RETORNAR O VALOR DE UMA DETERMINADA LOGICA, ONDE FICA ESCUTANDO SE TEM MUDANÇA OU NAO
  //VARIAVEL ONDE FAZ A VERIFICAÇÃO ONDE QUAIS TAREFAS NAO ESTAO COMPLETAS
  uncompletedTasks = computed(() =>
    this.tasks().filter((task) => !task.isCompleted)
  );

  //VARIAVEL ONDE FAZ A VERIFICAÇÃO ONDE QUAIS TAREFAS ESTAO COMPLETAS
  completedTasks = computed(() =>
    this.tasks().filter((task) => task.isCompleted)
  );

  //VARIAVEL ONDE FAZ A VERIFICAÇÃO SE TEM TAREFA COMPLETA => ONDE ESTA SEMDO UTILIZADO NO TEMPLATE PARA PODER VALIDAR NO TEMPLATE
  hasCompletedTasks = computed(() => this.completedTasks().length > 0);

  //VARIAVEL ONDE FAZ A VERIFICAÇÃO SE NAO TAREFA COMPLETA
  hasUncompletedTasks = computed(() => this.uncompletedTasks().length > 0);


  constructor() {
    effect(() => {
      this.saveTasksInStorage();
    });
  }

  addTask() {
    if (this.taskControl.invalid) {
      return;
    }

    this.tasks.update((tasks) => {

      const taskTitle = this.taskControl.value as string;

      const newTask: Task = { title: taskTitle, isCompleted: false };

      return [...tasks, newTask];
    });

    this.taskControl.reset();
  }

  /**
   *
   * metodos utilizazdos
   * mutate => Metodo que criamos uma mutabilidade, ex. pegamos o valor de uma instancia, mudamos o valor dessa instancia, nesse caso acrescentando uma tarefa digitada pelo usuario
   * set => Metodo  onde atribumimos um valor mudando o estado atual da variavel
   * update => Pegamos um valor de dentro do signal e trabalho em cuma do array e retornar algo com uma nova instancia
   */




  markTaskAsCompleted(task: Task) {
    this.tasks.mutate((tasks) => {
      // pega o index da tarefa da lista que foi marcada como completada
      const taskIndex = tasks.indexOf(task);

      //recria a tarefa com o isCompleted true
      const taskMarkedAsCompleted: Task = { ...task, isCompleted: true };

      //remove a ultima task criada e coloca uma nova no lugar
      //splice pega o index que vc esta no array (taskIndex), escolhe quantos ira remover que no caso é (1), e cria outroa tarefa comcluida (taskMarkedAsCompleted)
      tasks.splice(taskIndex, 1, taskMarkedAsCompleted);
    });
  }

  removeTask(task: Task) {
    this.tasks.mutate((tasks) => {
      const taskIndex = tasks.indexOf(task);
      tasks.splice(taskIndex, 1);
    });
  }

  saveTasksInStorage() {
    if (this.tasks()) {
      window.localStorage.setItem("tasks", JSON.stringify(this.tasks()));
    }
  }

  getTasksFromStorage() {
    return JSON.parse((window.localStorage.getItem("tasks") as string) || "[]");
  }
}
