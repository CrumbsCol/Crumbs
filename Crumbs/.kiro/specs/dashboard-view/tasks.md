# Implementation Plan: dashboard-view

## Overview

The component scaffold (`.ts`, `.html`, `.scss`) is already in place with a working structure. This plan refines the existing files to production-ready quality: wiring the Angular Router, adding SCSS truncation rules, setting up fast-check for property-based testing, and writing the full test suite.

## Tasks

- [x] 1. Wire Angular Router into DashboardComponent
  - [x] 1.1 Inject Router and implement navigation methods with error handling
    - Inject `Router` from `@angular/router` using `inject()` in `dashboard.component.ts`
    - Add `isPlatformBrowser` guard from `@angular/common` using `PLATFORM_ID` injection token to satisfy SSR requirement
    - Replace the `console.log` stubs in `onCrearSalida()` and `onAgregarSalida()` with `Router.navigate()` calls wrapped in `try/catch`
    - Add `@Output() crearSalida` and `@Output() agregarSalida` `EventEmitter` fallback outputs that fire when navigation is not possible or fails
    - Log navigation errors to console without re-throwing (`console.error`)
    - _Requirements: 3.5, 3.6, 3.7, 5.6_

  - [ ]* 1.2 Write unit test — navigation success and failure
    - Mock `Router` with a spy; verify `navigate` is called with the correct path on button click
    - Mock `Router.navigate` to reject; verify no uncaught exception is thrown and the output event fires as fallback
    - _Requirements: 3.5, 3.6, 3.7_

- [x] 2. Add SCSS truncation styles for label and description overflow
  - [x] 2.1 Extend `.component.scss` with ellipsis rules
    - Add `overflow: hidden; white-space: nowrap; text-overflow: ellipsis;` to `.salidas-list__label`
    - Add the same three rules to `.salidas-list__description`
    - Verify the containing `.salidas-list__item` has `min-width: 0` so flex/grid children can shrink below their content size
    - _Requirements: 4.7, 4.8_

  - [ ]* 2.2 Write unit test — overflow truncation classes applied
    - Assert that the rendered `<span class="salidas-list__label">` element has the computed CSS properties `text-overflow: ellipsis` and `overflow: hidden` (using jsdom `getComputedStyle`)
    - _Requirements: 4.7, 4.8_

- [x] 3. Install and configure fast-check
  - [x] 3.1 Add fast-check as a dev dependency
    - Run `npm install --save-dev fast-check@^3.22.0` to add the package
    - Verify the package appears in `devDependencies` of `package.json`
    - No additional Vitest configuration is required; fast-check integrates directly with `expect` from Vitest
    - _Requirements: 5.2 (tooling constraint from design Testing Strategy)_

- [x] 4. Write the full test file for DashboardComponent
  - [x] 4.1 Create `dashboard.component.spec.ts` with TestBed setup and example unit tests
    - Create `src/app/features/dashboard/components/dashboard.component.spec.ts`
    - Configure `TestBed` with the standalone `DashboardComponent`
    - Add example tests covering:
      - Req 1.2: `nickName` Signal initialized (default value present, is a signal)
      - Req 2.1–2.3: Grid container has classes `grid-cols-1`, `md:grid-cols-2`, `gap-6`
      - Req 3.1: Exactly two buttons labeled "Crear Salida" and "Agregar Salida"
      - Req 3.2: Both buttons carry the `mat-flat-button` attribute
      - Req 4.1: Card contains `<h2>` with text "Mis Salidas Activas"
      - Req 4.6 / 5.8: Empty list shows `<p role="status">` with non-empty text
      - Req 5.1: `DashboardComponent` metadata has `standalone: true`
      - Req 5.5: Template contains no `<header>`, `<nav>`, or session button elements
      - Req 5.6: Component initializes without accessing `window`/`document` (run in jsdom with no errors)
    - _Requirements: 1.2, 2.1, 2.2, 2.3, 3.1, 3.2, 4.1, 4.6, 5.1, 5.5, 5.6, 5.8_

  - [x] 4.2 Write property test — Property 1: welcomeTitle es una función pura del nickName
    - Import `fc` from `fast-check`
    - Add tag comment: `// Feature: dashboard-view, Property 1: welcomeTitle es una función pura del nickName`
    - Use `fc.string()` to generate arbitrary names; set `component.nickName.set(name)` and assert `component.welcomeTitle() === \`¡Hola, ${name}!\``
    - Run with `{ numRuns: 100 }`
    - **Property 1: welcomeTitle es una función pura del nickName**
    - **Validates: Requirements 1.1, 1.3, 1.4**

  - [ ]* 4.3 Write property test — Property 2: Cada ítem renderizado expone label y description
    - Add tag comment: `// Feature: dashboard-view, Property 2: Cada ítem renderizado expone label y description`
    - Use `fc.array(fc.record({...}), { minLength: 1, maxLength: 50 })` to generate salidas arrays; call `fixture.detectChanges()` after `set()`; assert each rendered `.salidas-list__item` contains the correct label and description text
    - Run with `{ numRuns: 100 }`
    - **Property 2: Cada ítem renderizado expone label y description**
    - **Validates: Requirements 4.2**

  - [ ]* 4.4 Write property test — Property 3: Solo el primer ítem recibe el estado activo
    - Add tag comment: `// Feature: dashboard-view, Property 3: Solo el primer ítem recibe el estado activo`
    - Use the same array generator; assert `items[0]` has class `salidas-list__item--active` and all subsequent items do not
    - Run with `{ numRuns: 100 }`
    - **Property 3: Solo el primer ítem recibe el estado activo**
    - **Validates: Requirements 4.4, 4.5**

  - [ ]* 4.5 Write property test — Property 4: Todos los elementos interactivos tienen aria-label no vacío
    - Add tag comment: `// Feature: dashboard-view, Property 4: Todos los elementos interactivos tienen aria-label no vacío`
    - Use `fc.array(fc.record({...}), { maxLength: 50 })` (including empty); for each generated state assert every `<button>` has either a non-empty `aria-label` attribute or non-empty `textContent`
    - Run with `{ numRuns: 100 }`
    - **Property 4: Todos los elementos interactivos tienen aria-label no vacío**
    - **Validates: Requirements 5.7**

- [x] 5. Checkpoint — run the test suite
  - Run `npx vitest --run` from the project root to confirm all example tests and property tests pass. Ask the user if any test fails unexpectedly.

- [x] 6. Verify lazy route wiring and SSR build
  - [x] 6.1 Confirm lazy-loaded route declaration in app.routes.ts
    - Open `src/app/app.routes.ts` and verify the `/dashboard` route uses `loadComponent` pointing to `DashboardComponent` (already present; confirm no regression)
    - _Requirements: 5.1 (standalone integration)_

  - [x] 6.2 Verify SSR build compiles without errors
    - Run `ng build` and confirm the build output includes both `browser/` and `server/` bundles with no TypeScript or template errors
    - _Requirements: 5.6_

- [x] 7. Final checkpoint — all tests pass and build is clean
  - Ensure `npx vitest --run` exits with 0 failures and `ng build` produces no errors. Ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP iteration
- Task 1.1 modifies `dashboard.component.ts`; task 2.1 modifies `dashboard.component.scss` — they touch different files and can execute in parallel (wave 1)
- Task 3.1 (npm install) must complete before task 4.1–4.5 to ensure fast-check is available at import time
- All property tests live in a single spec file created in task 4.1; tasks 4.2–4.5 add to that file sequentially
- Checkpoints (tasks 5 and 7) are not parallelizable — they validate the state of all prior tasks

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "2.1", "3.1"] },
    { "id": 1, "tasks": ["1.2", "2.2", "4.1", "6.1"] },
    { "id": 2, "tasks": ["4.2", "4.3", "4.4", "4.5"] },
    { "id": 3, "tasks": ["6.2"] }
  ]
}
```
