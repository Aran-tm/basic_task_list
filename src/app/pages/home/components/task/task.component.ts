import { Component, signal } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-task',
  imports: [CardModule, ButtonModule, InputTextModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})
export class TaskComponent {
  addATask = signal<boolean>(false);
  typedValue = signal<string>("");

  constructor() { }

  /**
   * Allows you to manage a new task
   */
  addTask(): void {
    this.addATask.set(true);
  }
}
