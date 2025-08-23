import { ITask } from '@core/interfaces/task.interface';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  Component,
  signal,
  output,
  ElementRef,
  ViewChild,
} from '@angular/core';
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
  setColor = signal<string>('');

  wordsArray: string[] = [];
  taskList: ITask[] = [];
  showPlaceholder = true;
  @ViewChild('editableDiv') editableDiv!: ElementRef;

  constructor() {}

  /** It is used to detect whether a character is being written or not. */
  onInput(): void {
    const text = this.editableDiv.nativeElement.innerText;
    this.typedValue.set(text);

    this.wordsArray = text
      .split(/(\s+)/)
      .filter((word: string) => word.length > 0);

    let newHtml = '';
    this.wordsArray.forEach((word: string) => {
      if (word.trim().length === 0) {
        newHtml += word;
      } else if (word.includes('@gmail')) {
        newHtml += `<span style="color: #F8A946">${word}</span>`;
      } else if (word.includes('@')) {
        newHtml += `<span style="color: #17AD7C">${word}</span>`;
      } else if (word.includes('#')) {
        newHtml += `<span style="color: #8954EB">${word}</span>`;
      } else if (word.includes('www.') || word.includes('https://')) {
        newHtml += `<span style="color: #4FA7FF">${word}</span>`;
      } else {
        newHtml += `<span style="color: #2d3748">${word}</span>`;
      }
    });

    this.setHtmlContent(newHtml);

    this.typedValue().trim().length > 0
      ? this.isTyping.emit(true)
      : this.isTyping.emit(false);

    this.showPlaceholder = text.trim().length === 0;

    /** Saving the basic Task Into Local Storage  :) */
    localStorage.setItem("basic_task", this.typedValue());
  }

  private setHtmlContent(html: string): void {
    if (this.editableDiv.nativeElement.innerHTML === html) return;

    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) {
      this.editableDiv.nativeElement.innerHTML = html;
      return;
    }

    const range = selection.getRangeAt(0);
    const preCaretRange = range.cloneRange();
    preCaretRange.selectNodeContents(this.editableDiv.nativeElement);
    preCaretRange.setEnd(range.startContainer, range.startOffset);
    const startOffset = preCaretRange.toString().length;

    this.editableDiv.nativeElement.innerHTML = html;

    const textNodes = this.getTextNodes(this.editableDiv.nativeElement);
    let pos = 0;
    let targetNode: Node | null = null;
    let targetOffset = 0;

    for (const node of textNodes) {
      const nodeLength = node.textContent?.length || 0;
      if (pos + nodeLength >= startOffset) {
        targetNode = node;
        targetOffset = startOffset - pos;
        break;
      }
      pos += nodeLength;
    }

    if (targetNode) {
      const newRange = document.createRange();
      newRange.setStart(targetNode, targetOffset);
      newRange.collapse(true);
      selection.removeAllRanges();
      selection.addRange(newRange);
    }
  }

  private getTextNodes(node: Node): Node[] {
    const textNodes: Node[] = [];
    const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, null);

    let currentNode;
    while ((currentNode = walker.nextNode())) {
      textNodes.push(currentNode);
    }

    return textNodes;
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.isTyping.emit(false);

      if (this.typedValue().trim().length > 0) {
        this.typedValue.set('');
        this.showPlaceholder = true;
      }
    }
  }

  onBlur(): void {
    this.showPlaceholder = this.typedValue().trim().length === 0;
  }

  onFocus(): void {
    this.showPlaceholder = false;
  }

  onPaste(event: ClipboardEvent): void {
    event.preventDefault();

    const pastedText = event.clipboardData?.getData('text/plain') || '';

    document.execCommand('insertText', false, pastedText);

    this.typedValue.set(this.editableDiv.nativeElement.innerText);
    this.showPlaceholder = this.typedValue().trim().length === 0;
  }
}
