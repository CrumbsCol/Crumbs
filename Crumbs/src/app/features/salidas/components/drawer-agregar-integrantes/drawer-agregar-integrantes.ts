import { Component, inject, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { Miembro } from '../../../../core/interfaces/salida.interface';
import { environment } from '../../../../../environments/environment';

/** Resultado de búsqueda de usuario */
interface UserSearchResult {
  id: string;
  nombre: string;
  apellido?: string;
  userName: string;
  email: string;
  avatarUrl: string | null;
}

/**
 * Panel lateral (drawer) para agregar integrantes a la salida.
 *
 * Funcionalidades:
 * - Buscador por UserName.
 * - Buscador por Correo electrónico.
 * - Integrante Fantasma: agregar miembro solo con nombre.
 * - Sección de "Miembros Frecuentes" con cards de avatar.
 * - Botones "Cancelar" y "Agregar" en el footer.
 */
@Component({
  selector: 'app-drawer-agregar-integrantes',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './drawer-agregar-integrantes.html',
  styleUrl: './drawer-agregar-integrantes.css',
})
export class DrawerAgregarIntegrantes {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  /** Controla si el drawer está visible */
  readonly abierto = input<boolean>(false);

  /** Evento emitido al cerrar el drawer */
  readonly cerrar = output<void>();

  /** Evento emitido al confirmar la agregación de integrantes */
  readonly integrantesAgregados = output<Miembro[]>();

  /** Valor del campo de búsqueda por userName */
  readonly busqueda = signal('');

  /** Valor del campo de búsqueda por email */
  readonly busquedaEmail = signal('');

  /** Nombre del integrante fantasma */
  readonly nombreFantasma = signal('');

  /** Mensaje de error si la búsqueda no encuentra resultados */
  readonly errorBusqueda = signal('');

  /** Lista de miembros seleccionados para agregar en lote */
  readonly seleccionados = signal<Miembro[]>([]);

  /** Miembros frecuentes obtenidos del servicio */
  readonly miembrosFrecuentes = signal<Miembro[]>([]);

  constructor() {
    // Cargar miembros frecuentes desde el backend
    this.http.get<UserSearchResult[]>(`${this.apiUrl}/users/search/frecuentes`).subscribe({
      next: (users) => {
        const miembros: Miembro[] = users.map((u) => ({
          id: u.id,
          nombre: u.nombre,
          userName: u.userName,
          email: u.email,
          avatarUrl: u.avatarUrl,
        }));
        this.miembrosFrecuentes.set(miembros);
      },
      error: () => this.miembrosFrecuentes.set([]),
    });
  }

  /** Busca un miembro por userName exacto */
  buscar(): void {
    const query = this.busqueda().trim();
    if (!query) {
      this.errorBusqueda.set('Ingresa un UserName.');
      return;
    }

    this.http.get<UserSearchResult>(`${this.apiUrl}/users/search`, { params: { q: query } }).subscribe({
      next: (user) => {
        const miembro: Miembro = {
          id: user.id,
          nombre: user.nombre,
          userName: user.userName,
          email: user.email,
          avatarUrl: user.avatarUrl,
        };
        this.agregarASeleccion(miembro);
        this.errorBusqueda.set('');
      },
      error: () => {
        this.errorBusqueda.set(`No se encontró un usuario con "${query}".`);
      },
    });
  }

  /** Busca un miembro por correo electrónico exacto */
  buscarPorEmail(): void {
    const query = this.busquedaEmail().trim();
    if (!query) {
      this.errorBusqueda.set('Ingresa un correo electrónico.');
      return;
    }

    this.http.get<UserSearchResult>(`${this.apiUrl}/users/search`, { params: { q: query } }).subscribe({
      next: (user) => {
        const miembro: Miembro = {
          id: user.id,
          nombre: user.nombre,
          userName: user.userName,
          email: user.email,
          avatarUrl: user.avatarUrl,
        };
        this.agregarASeleccion(miembro);
        this.errorBusqueda.set('');
      },
      error: () => {
        this.errorBusqueda.set(`No se encontró un usuario con "${query}".`);
      },
    });
  }

  /** Agrega un integrante fantasma (solo con nombre, sin cuenta real) */
  agregarFantasma(): void {
    const nombre = this.nombreFantasma().trim();
    if (!nombre) return;

    const fantasma: Miembro = {
      id: `fantasma_${Date.now()}`,
      nombre,
      userName: '',
      email: '',
      avatarUrl: null,
    };

    this.agregarASeleccion(fantasma);
    this.nombreFantasma.set('');
  }

  /**
   * Agrega un miembro a la lista de seleccionados.
   * Evita duplicados por ID.
   */
  agregarASeleccion(miembro: Miembro): void {
    const yaExiste = this.seleccionados().some((m) => m.id === miembro.id);
    if (!yaExiste) {
      this.seleccionados.update((lista) => [...lista, miembro]);
    }
    this.busqueda.set('');
    this.busquedaEmail.set('');
    this.errorBusqueda.set('');
  }

  /** Remueve un miembro de la lista de seleccionados */
  removerDeSeleccion(id: string): void {
    this.seleccionados.update((lista) => lista.filter((m) => m.id !== id));
  }

  /** Verifica si un miembro ya está en la lista de seleccionados */
  yaSeleccionado(id: string): boolean {
    return this.seleccionados().some((m) => m.id === id);
  }

  /** Confirma la agregación en lote */
  confirmarAgregacion(): void {
    const miembros = this.seleccionados();
    if (miembros.length === 0) return;
    this.integrantesAgregados.emit(miembros);
    this.resetEstado();
  }

  /** Cierra el drawer y resetea el estado */
  onCerrar(): void {
    this.cerrar.emit();
    this.resetEstado();
  }

  /** Resetea todo el estado interno del drawer */
  private resetEstado(): void {
    this.busqueda.set('');
    this.busquedaEmail.set('');
    this.nombreFantasma.set('');
    this.errorBusqueda.set('');
    this.seleccionados.set([]);
  }
}
