import { Component, inject, afterNextRender } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { filter } from 'rxjs';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly document = inject(DOCUMENT);

  constructor() {
    // afterNextRender solo se ejecuta en el BROWSER después del hydration
    // Garantiza acceso a localStorage y que la sesión se rehidrate
    afterNextRender(() => {
      this.authService.autoLogin().subscribe();
    });

    // Body class condicional para estilos auth (fondo sin blur)
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd)
    ).subscribe((e) => {
      this.document.body.classList.remove('is-home');
      if (e.urlAfterRedirects.includes('/login') || e.urlAfterRedirects.includes('/registro')) {
        this.document.body.classList.add('is-auth');
      } else {
        this.document.body.classList.remove('is-auth');
      }
    });
  }
}
