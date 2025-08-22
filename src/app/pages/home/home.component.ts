import { Router } from '@angular/router';
import { Component, inject } from '@angular/core';
import { TaskComponent } from "./components/task/task.component";

@Component({
  selector: 'app-home',
  imports: [TaskComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  router = inject(Router);

  constructor() {}

  redirectToHome(): void {
    this.router.navigateByUrl('/');
  }
}
