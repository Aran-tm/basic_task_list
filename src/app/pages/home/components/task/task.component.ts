import { Component, signal } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TypeInputComponent } from '../type-input/type-input.component';
import { OptionsComponent } from "../options/options.component";

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
    OptionsComponent
],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})
export class TaskComponent {
  isTouched = signal<boolean>(false);

  constructor() { }
  
  addATask(event: boolean) {
    this.isTouched.set(event);
  }
}