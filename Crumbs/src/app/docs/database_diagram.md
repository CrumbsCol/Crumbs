# Diagrama del Modelo de Base de Datos

A continuación tienes el diagrama Entidad-Relación (ER) que representa visualmente el modelo de base de datos para el backend de Crumbs. 

```mermaid
erDiagram
    %% Relaciones
    USERS ||--o{ SALIDAS_MIEMBROS : "tiene cuenta"
    SALIDAS ||--o{ SALIDAS_MIEMBROS : "tiene integrantes"
    SALIDAS ||--o{ GASTOS : "registra"
    SALIDAS ||--o{ PAGOS : "contiene"
    
    SALIDAS_MIEMBROS ||--o{ GASTOS : "paga (pagado_por)"
    
    GASTOS ||--o{ GASTOS_PARTICIPANTES : "se divide en"
    SALIDAS_MIEMBROS ||--o{ GASTOS_PARTICIPANTES : "participa en"
    
    SALIDAS_MIEMBROS ||--o{ PAGOS : "es deudor"
    SALIDAS_MIEMBROS ||--o{ PAGOS : "es acreedor (pagador)"
    GASTOS |o--o{ PAGOS : "puede originar"

    %% Entidades y Atributos
    USERS {
        uuid id PK
        varchar nombre
        varchar user_name
        varchar email
        date fecha_nacimiento
        varchar avatar_url
        varchar tipo_metodo_pago
        varchar metodo_pago
        varchar password_hash
        timestamp created_at
    }

    SALIDAS {
        uuid id PK
        varchar titulo
        varchar codigo_invitacion
        timestamp fecha_creacion
    }

    SALIDAS_MIEMBROS {
        uuid id PK
        uuid salida_id FK
        uuid user_id FK
        varchar nombre_fantasma
        varchar rol
        timestamp joined_at
    }

    GASTOS {
        uuid id PK
        uuid salida_id FK
        varchar nombre
        text descripcion
        decimal monto
        timestamp fecha
        enum metodo_division
        uuid pagado_por_miembro_id FK
        timestamp created_at
    }

    GASTOS_PARTICIPANTES {
        uuid gasto_id PK, FK
        uuid miembro_id PK, FK
        boolean es_invitado
        decimal monto_manual
    }

    PAGOS {
        uuid id PK
        uuid salida_id FK
        uuid deudor_id FK
        uuid pagador_id FK
        uuid gasto_id FK
        decimal monto
        enum estado
        timestamp fecha
        timestamp updated_at
    }
```

> [!TIP]
> Dado que Github Flavored Markdown soporta `mermaid`, el bloque superior se renderizará automáticamente como un diagrama visual en plataformas como GitHub, Notion o en visores de Markdown compatibles. También puedes copiar el bloque de código y pegarlo en [Mermaid Live Editor](https://mermaid.live/) para exportarlo como imagen PNG o SVG.
