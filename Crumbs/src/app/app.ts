import { Component, inject, afterNextRender } from '@angular/core';
import { RouterOutlet } from '@angular/router';
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

  constructor() {
    // afterNextRender solo se ejecuta en el BROWSER después del hydration
    // Garantiza acceso a localStorage y que la sesión se rehidrate
    afterNextRender(() => {
      this.authService.autoLogin().subscribe();
    });
  }
}
