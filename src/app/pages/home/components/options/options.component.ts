import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { IButton } from '@core/interface/button.interface';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-options',
  imports: [CommonModule, ButtonModule],
  templateUrl: './options.component.html',
  styleUrl: './options.component.scss',
})
export class OptionsComponent {
  disableOptions = signal<boolean>(true);
  somethingTyped = signal<string>('');
  buttons: IButton[] = [
    {
      id: 1,
      icon: '/assets/icons/expand-icon.svg',
      name: 'Open',
      bg: '#EAF0F5'
    },
    {
      id: 2,
      icon: '/assets/icons/calendar-icon.svg',
      name: 'Today',
      bg: 'transparent'
    },
    {
      id: 3,
      icon: '/assets/icons/lock-icon.svg',
      name: 'Public',
      bg: 'transparent'
    },
    {
      id: 4,
      icon: '/assets/icons/sun-icon.svg',
      name: 'Normal',
      bg: 'transparent'
    },
    {
      id: 5,
      icon: '/assets/icons/eye-icon.svg',
      name: 'Extimation',
      bg: 'transparent'
    },
  ];

  constructor() {}

  /** Add a basic Task */
  add(): void {}

  /** Cancel current action */
  cancel(): void {}
}
