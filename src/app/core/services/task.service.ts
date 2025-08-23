import { Injectable } from '@angular/core';
import { ITask } from '../interfaces/task.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: ITask[] = [];
  private tasksSubject = new BehaviorSubject<ITask[]>([]);

  getTasks(): Observable<ITask[]> {
    return this.tasksSubject.asObservable();
  }

  getTasksArray(): ITask[] {
    return [...this.tasks];
  }

  addTask(taskText: string): ITask {
    const newTask: ITask = {
      text: taskText.trim(),
    };

    this.tasks.push(newTask);
    this.tasksSubject.next([...this.tasks]);

    return newTask;
  }

  addTaskObject(task: ITask): void {
    this.tasks.push(task);
    this.tasksSubject.next([...this.tasks]);
  }

  clearTasks(): void {
    this.tasks = [];
    this.tasksSubject.next([]);
  }
}
