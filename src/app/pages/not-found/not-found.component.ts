import { Router } from '@angular/router';
import { Component, inject } from '@angular/core';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-not-found',
  imports: [Button],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
})
export class NotFoundComponent {
  router = inject(Router);

  constructor() {}

  redirectToHome(): void {
    this.router.navigateByUrl('/');
  }
}
