import { CommonModule } from '@angular/common';
import { Component, computed, input, signal, output } from '@angular/core';
import { IButton } from '@core/interface/button.interface';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-options',
  imports: [CommonModule, ButtonModule],
  templateUrl: './options.component.html',
  styleUrl: './options.component.scss',
})
export class OptionsComponent {
  isTyping = input<boolean>(false);
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

  constructor() {}

  /** Add a basic Task */
  add(): void {}

  /** Go back, main Basic Task List */
  goBack(): void {
    this.addAction.emit(false);
  }

  /** Cancel current action */
  cancel(): void {
    this.addAction.emit(false);
  }
}
