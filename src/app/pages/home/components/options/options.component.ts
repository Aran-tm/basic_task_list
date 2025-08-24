import { CommonModule } from '@angular/common';
import { Component, computed, input, signal, output, inject } from '@angular/core';
import { IButton } from '@core/interfaces/button.interface';
import { ITask } from '@core/interfaces/task.interface';
import { TaskService } from '@core/services/task.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-options',
  imports: [CommonModule, ButtonModule],
  templateUrl: './options.component.html',
  styleUrl: './options.component.scss',
})
export class OptionsComponent {
  isTyping = input<boolean>(false);
  typedValue = input<string>('');
  isDisquetteMode = input<boolean>(false)
  disableOptions = computed(() => !this.isTyping());
  somethingTyped = signal<string>('');
  addAction = output<boolean>();
  buttons: IButton[] = [
    {
      id: 1,
      icon: '/assets/icons/expand-icon.svg',
      name: 'Open',
      bg: '#EAF0F5',
    },
    {
      id: 2,
      icon: '/assets/icons/calendar-icon.svg',
      name: 'Today',
      bg: 'transparent',
    },
    {
      id: 3,
      icon: '/assets/icons/lock-icon.svg',
      name: 'Public',
      bg: 'transparent',
    },
    {
      id: 4,
      icon: '/assets/icons/sun-icon.svg',
      name: 'Normal',
      bg: 'transparent',
    },
    {
      id: 5,
      icon: '/assets/icons/eye-icon.svg',
      name: 'Extimation',
      bg: 'transparent',
    },
  ];

  taskService = inject(TaskService);

  constructor() {}

  /** Add a basic Task */
  add(): void {
    // Same behavior as for other features.
    this.taskService.addTask(this.typedValue());
    this.addAction.emit(false);
  }

  /** Go back, main Basic Task List */
  goBack(): void {
    this.addAction.emit(false);
  }

  /** Cancel current action */
  cancel(): void {
    this.addAction.emit(false);
  }
}
