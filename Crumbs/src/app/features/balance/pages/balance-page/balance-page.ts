import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
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
export class BalancePage {
  private readonly salidaService = inject(SalidaService);
  
  readonly balanceGlobal = this.salidaService.balanceGlobal;
}
