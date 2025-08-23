import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component, signal, output, ElementRef, ViewChild } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-type-input',
  imports: [FormsModule, ReactiveFormsModule, CommonModule, AvatarModule],
  templateUrl: './type-input.component.html',
  styleUrl: './type-input.component.scss',
})
export class TypeInputComponent {
  addATask = output<boolean>();
  isTyping = output<boolean>();
  taskValue = signal<boolean>(false);
  typedValue = signal<string>('');

  showPlaceholder = true;
  @ViewChild('editableDiv') editableDiv!: ElementRef;

  constructor() {}

  /**
   * Allows you to manage a new task
   */
  addTask(): void {
    this.addATask.emit(true);
    this.taskValue.set(true);
  }

  /** It is used to detect whether a character is being written or not. */
  onInput() {
    const text = this.editableDiv.nativeElement.innerText;

    this.typedValue.set(text);

    this.typedValue().trim().length > 0
      ? this.isTyping.emit(true)
      : this.isTyping.emit(false);

    this.showPlaceholder = text.trim().length === 0;
  }

  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();


      if (this.typedValue().trim().length > 0) {
        console.log('Texto a enviar:', this.typedValue());
  
        this.editableDiv.nativeElement.innerText = '';
        this.typedValue.set('');
        this.showPlaceholder = true;
      }
    }
  }

  onBlur() {
    this.showPlaceholder = this.typedValue().trim().length === 0;
  }

  onFocus() {
    this.showPlaceholder = false;
  }

  onPaste(event: ClipboardEvent) {
    event.preventDefault();

    const pastedText = event.clipboardData?.getData('text/plain') || '';

    document.execCommand('insertText', false, pastedText);

    this.typedValue.set(this.editableDiv.nativeElement.innerText);
    this.showPlaceholder = this.typedValue().trim().length === 0;
  }
}
