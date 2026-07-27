import { Component, inject } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly router = inject(Router);
  private readonly document = inject(DOCUMENT);

  constructor() {
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd)
    ).subscribe((e) => {
      // Limpiar clase anterior si existía
      this.document.body.classList.remove('is-home');
      
      if (e.urlAfterRedirects.includes('/login') || e.urlAfterRedirects.includes('/registro')) {
        this.document.body.classList.add('is-auth');
      } else {
        this.document.body.classList.remove('is-auth');
      }
    });
  }
}
