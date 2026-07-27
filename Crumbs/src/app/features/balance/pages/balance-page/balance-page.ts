import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { SalidaService } from '../../../../core/services/salida.service';

@Component({
  selector: 'app-balance-page',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatDividerModule],
  templateUrl: './balance-page.html',
  styleUrl: './balance-page.css',
})
export class BalancePage implements OnInit {
  private readonly salidaService = inject(SalidaService);
  private readonly platformId = inject(PLATFORM_ID);

  readonly balanceDetallado = this.salidaService.balanceDetallado;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.salidaService.cargarBalanceDetallado();
    }
  }
}
