import { TestBed } from '@angular/core/testing';
import { TaskService } from './task.service';
import { ITask } from '../interfaces/task.interface';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [TaskService],
    }).compileComponents();

    service = TestBed.inject(TaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getTasks', () => {
    it('should return an observable of tasks', (done) => {
      service.getTasks().subscribe((tasks) => {
        expect(tasks).toEqual([]);
        done();
      });
    });
  });

  describe('getTasksArray', () => {
    it('should return an empty array initially', () => {
      expect(service.getTasksArray()).toEqual([]);
    });

    it('should return a copy of the tasks array', () => {
      service.addTask('Test task');
      const tasks = service.getTasksArray();

      expect(tasks).toEqual([{ text: 'Test task' }]);
      
      tasks.push({ text: 'New task' });
      expect(service.getTasksArray().length).toBe(1);
    });
  });

  describe('addTask', () => {
    it('should add a task with trimmed text', () => {
      const task = service.addTask('  Test task  ');

      expect(task.text).toBe('Test task');
      expect(service.getTasksArray()).toContain(task);
    });

    it('should notify subscribers when a task is added', (done) => {
      service.getTasks().subscribe((tasks) => {
        if (tasks.length > 0) {
          expect(tasks[0].text).toBe('Test task');
          done();
        }
      });

      service.addTask('Test task');
    });
  });

  describe('addTaskObject', () => {
    it('should add a complete task object', () => {
      const newTask: ITask = { text: 'Test task' };
      service.addTaskObject(newTask);

      expect(service.getTasksArray()).toContain(newTask);
    });
  });

  describe('clearTasks', () => {
    it('should remove all tasks', () => {
      service.addTask('Task 1');
      service.addTask('Task 2');

      service.clearTasks();

      expect(service.getTasksArray()).toEqual([]);
    });

    it('should notify subscribers when tasks are cleared', (done) => {
      service.addTask('Task 1');

      service.getTasks().subscribe((tasks) => {
        if (tasks.length === 0) {
          expect(tasks).toEqual([]);
          done();
        }
      });

      service.clearTasks();
    });
  });
});
