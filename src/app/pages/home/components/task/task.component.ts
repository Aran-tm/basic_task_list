import { SafeHtmlPipe } from '@core/pipe/safe.pipe';
import { ITask } from '@core/interfaces/task.interface';
import { Component, signal, OnInit, inject } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TypeInputComponent } from '../type-input/type-input.component';
import { OptionsComponent } from '../options/options.component';
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
    SafeHtmlPipe,
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})
export class TaskComponent implements OnInit {
  isTouched = signal<boolean>(false);
  isTyping = signal<boolean>(false);
  typedValue = signal<string>('');
  editedTask = signal<ITask>({
    id: 0,
    text: '',
  });
  taskList: ITask[] = [];

  taskService = inject(TaskService);
  tasksSubscription!: Subscription;

  mailIcon: string = '/assets/icons/mail-icon.svg';
  linkIcon: string = '/assets/icons/link-icon.svg';

  constructor() {}

  ngOnInit(): void {
    this.subscribeObservers();
    console.log(`editedTask`, this.editedTask());
  }

  // Subscribe to task changes
  subscribeObservers(): void {
    this.tasksSubscription = this.taskService.getTasks().subscribe(
      (tasks: ITask[]) => {
        this.isTouched.set(false); // This allows you to return to the initial view
        this.taskList = tasks;

        this.taskList = tasks.map((task, index) => {
          return { ...task, id: task.id || index + 1 };
        });
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
    this.editedTask.set({
      id: 0,
      text: ''
    });
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
        result += `<span class="email"><img src="${this.mailIcon}"></img>Mail</span>`;
      } else if (word.startsWith('@')) {
        result += `<span class="mention">${word}</span>`;
      } else if (word.startsWith('#')) {
        result += `<span class="hashtag">${word}</span>`;
      } else if (
        word.startsWith('www.') ||
        word.startsWith('http://') ||
        word.startsWith('https://')
      ) {
        result += `<span class="link"><a href="${word}" target="_blank"><img src="${this.linkIcon}"></img>Link</a></span>`;
      } else {
        result += `<span class="normal">${word}</span>`;
      }
    });

    return result;
  }

  /** When Checkbox is clicked */
  checkboxClicked(task: ITask): void {
    this.isTouched.set(true); // This allows you to return to the edit note view
    this.editedTask.set(task);
    console.log(`Edited task`, this.editedTask);
  }

  /** Set the Edited Task Style */
  editedTaskStyle(text: string): string {
    // Reemplazar &nbsp; con espacios regulares para un procesamiento consistente
    const normalizedText = text.replace(/&nbsp;/g, ' ');

    const wordsArray = normalizedText
      .split(/(\s+)/)
      .filter((word: string) => word.length > 0);

    let newHtml = '';
    wordsArray.forEach((word: string) => {
      // Si es solo espacio, agregar como espacio normal
      if (word.trim().length === 0) {
        newHtml += ' ';
      } else if (word.includes('@gmail')) {
        newHtml += `<span style="color: #F8A946 !important;">${word}</span>`;
      } else if (word.includes('@')) {
        newHtml += `<span style="color: #17AD7C !important;">${word}</span>`;
      } else if (word.includes('#')) {
        newHtml += `<span style="color: #8954EB !important;">${word}</span>`;
      } else if (word.includes('www.') || word.includes('https://')) {
        newHtml += `<span style="color: #4FA7FF !important;">${word}</span>`;
      } else {
        newHtml += `<span style="color: #2d3748 !important;">${word}</span>`;
      }
    });

    console.log(`wordsArray`, wordsArray);
    console.log(`newHtml`, newHtml);

    return newHtml;
  }
}