import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-type-input',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './type-input.component.html',
  styleUrl: './type-input.component.scss',
})
export class TypeInputComponent {
  addATask = signal<boolean>(false);
  typedValue = signal<string>('');

  constructor() {}

  /**
   * Allows you to manage a new task
   */
  addTask(): void {
    this.addATask.set(true);
  }
}
