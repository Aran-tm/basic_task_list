import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component, signal, output } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-type-input',
  imports: [FormsModule, ReactiveFormsModule, CommonModule, AvatarModule],
  templateUrl: './type-input.component.html',
  styleUrl: './type-input.component.scss',
})
export class TypeInputComponent {
  addATask = output<boolean>();
  taskValue = signal<boolean>(false);
  typedValue = signal<string>('');

  constructor() {}

  /**
   * Allows you to manage a new task
   */
  addTask(): void {
    this.addATask.emit(true);
    this.taskValue.set(true);
    console.log(`Task value`, this.taskValue())
  }
}
