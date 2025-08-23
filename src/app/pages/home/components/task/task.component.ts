import { SafeHtmlPipe } from '@core/pipe/safe.pipe';
import { ITask } from '@core/interfaces/task.interface';
import { Component, signal, OnInit, inject } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TypeInputComponent } from '../type-input/type-input.component';
import { OptionsComponent } from "../options/options.component";
import { TaskService } from '@core/services/task.service';
import { Subscription } from 'rxjs';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-task',
  imports: [
    CardModule,
    ButtonModule,
    InputTextModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TypeInputComponent,
    OptionsComponent,
    CheckboxModule,
    SafeHtmlPipe
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})
export class TaskComponent implements OnInit {
  isTouched = signal<boolean>(false);
  isTyping = signal<boolean>(false);
  typedValue = signal<string>('');
  taskList: ITask[] = [];

  taskService = inject(TaskService);
  tasksSubscription!: Subscription;

  constructor() {}

  ngOnInit(): void {
    this.subscribeObservers();
  }

  // Subscribe to task changes
  subscribeObservers(): void {
    this.tasksSubscription = this.taskService.getTasks().subscribe(
      (tasks: ITask[]) => {
        this.isTouched.set(false); // This allows you to return to the initial view
        this.taskList = tasks;
      },
      (error) => {
        console.error('Error getting tasks:', error);
      }
    );
  }

  /** Detect if add a task or not */
  addATask(event: boolean): void {
    this.isTouched.set(event);
  }

  /** Detect if user is typing or not */
  isTypingFunction(event: boolean): void {
    this.isTyping.set(event);
  }

  /** Go back to main basic task list */
  goBack(event: boolean): void {
    this.isTouched.set(event);
    this.isTyping.set(event);
  }

  /** Recieve the item emited */
  recieveTypedFunction(event: string): void {
    this.typedValue.set(event);
  }

  /** Set the styles for each task item */
  setTaskStyle(text: string): string {
    // Dividir el texto en palabras, conservando los espacios
    const words = text.split(/(\s+)/).filter((word) => word.length > 0);

    let result = '';

    words.forEach((word) => {
      // Verificar el tipo de palabra y aplicar la clase correspondiente
      if (word.trim().length === 0) {
        result += word; // Mantener los espacios
      } else if (
        word.includes('@gmail') ||
        word.includes('@hotmail') ||
        word.includes('@yahoo') ||
        (word.includes('@') && word.includes('.') && word.length > 5)
      ) {
        result += `<span class="email">${word}</span>`;
      } else if (word.startsWith('@')) {
        result += `<span class="mention">${word}</span>`;
      } else if (word.startsWith('#')) {
        result += `<span class="hashtag">${word}</span>`;
      } else if (
        word.startsWith('www.') ||
        word.startsWith('http://') ||
        word.startsWith('https://')
      ) {
        result += `<span class="link"><a href="${word}" target="_blank">${word}</a></span>`;
      } else {
        result += `<span class="normal">${word}</span>`;
      }
    });

    return result;
  }
}