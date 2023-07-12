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

  uncompletedTasks = computed(() =>
    this.tasks().filter((task) => !task.isCompleted)
  );

  completedTasks = computed(() =>
    this.tasks().filter((task) => task.isCompleted)
  );

  hasCompletedTasks = computed(() => this.completedTasks().length > 0);

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

  markTaskAsCompleted(task: Task) {
    this.tasks.mutate((tasks) => {
      const taskIndex = tasks.indexOf(task);

      const taskMarkedAsCompleted: Task = { ...task, isCompleted: true };

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
