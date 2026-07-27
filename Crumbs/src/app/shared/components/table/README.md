# Table Component

Un componente de tabla genérico y reutilizable basado en `mat-table` de Angular Material. Permite renderizar listas de datos con columnas configurables y soporta plantillas personalizadas para celdas específicas.

## Importación

```typescript
import { TableComponent, TableColumn, TableColumnDefDirective } from 'src/app/shared/components/table/table.component';

@Component({
  imports: [TableComponent, TableColumnDefDirective],
  // ...
})
```

## Propiedades (Inputs/Outputs)

### Inputs
- `data`: `input.required<T[]>()`
  - Array de objetos con los datos a renderizar en la tabla.
- `columns`: `input.required<TableColumn[]>()`
  - Array con la configuración de las columnas.

### Outputs
- `rowClick`: `output<T>()`
  - Emite el objeto de la fila cuando se hace clic o se presiona Enter sobre ella.

## Interfaz `TableColumn`

```typescript
export interface TableColumn {
  key: string;       // Propiedad del objeto a mostrar
  header: string;    // Título de la columna
  type?: 'text' | 'date' | 'currency' | 'custom'; // Tipo de dato (por defecto 'text')
  format?: string;   // Formato adicional (ej. 'dd/MM/yyyy' para date, 'COP' para currency)
}
```

## Uso Básico

```html
<app-table 
  [data]="misDatos" 
  [columns]="misColumnas" 
  (rowClick)="onFilaSeleccionada($event)">
</app-table>
```

```typescript
misColumnas: TableColumn[] = [
  { key: 'nombre', header: 'Nombre', type: 'text' },
  { key: 'monto', header: 'Total', type: 'currency', format: 'COP' },
  { key: 'fecha', header: 'Fecha', type: 'date', format: 'dd/MM/yyyy' }
];
```

## Celdas Personalizadas

Para renderizar contenido HTML personalizado (como badges o botones) en una celda específica, usa la directiva `appTableColumnDef` en un `<ng-template>`:

```html
<app-table [data]="datos" [columns]="columnas">
  
  <!-- El valor de appTableColumnDef debe coincidir con el 'key' de la columna -->
  <ng-template appTableColumnDef="estado" let-elemento>
    <span class="badge" [class.activo]="elemento.estado === 'Activo'">
      {{ elemento.estado }}
    </span>
  </ng-template>
  
</app-table>
```

## Estado Vacío

Si el array de `data` está vacío, la tabla mostrará el contenido que envíes dentro del elemento con atributo `empty-state`:

```html
<app-table [data]="[]" [columns]="columnas">
  <div empty-state>
    <p>No hay registros para mostrar en este momento.</p>
  </div>
</app-table>
```
