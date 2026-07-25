import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpErrorResponse, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { errorInterceptor } from './error.interceptor';

describe('ErrorInterceptor', () => {
  let http: HttpClient;
  let httpTestingController: HttpTestingController;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let snackBarSpy: any;

  beforeEach(() => {
    snackBarSpy = { open: vi.fn() };

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([errorInterceptor])),
        provideHttpClientTesting(),
        { provide: MatSnackBar, useValue: snackBarSpy }
      ]
    });

    http = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should handle 401 error and show snackbar', () => {
    http.get('/test').subscribe({
      next: () => expect.fail('Should have failed with 401 error'),
      error: (error: HttpErrorResponse) => {
        expect(error.status).toBe(401);
      }
    });

    const req = httpTestingController.expectOne('/test');
    req.flush('Unauthorized', { status: 401, statusText: 'Unauthorized' });

    expect(snackBarSpy.open).toHaveBeenCalledWith(
      'Sesión expirada o credenciales inválidas.',
      'Cerrar',
      expect.any(Object)
    );
  });

  it('should handle 500 error and show snackbar', () => {
    http.get('/test').subscribe({
      next: () => expect.fail('Should have failed with 500 error'),
      error: (error: HttpErrorResponse) => {
        expect(error.status).toBe(500);
      }
    });

    const req = httpTestingController.expectOne('/test');
    req.flush('Server Error', { status: 500, statusText: 'Internal Server Error' });

    expect(snackBarSpy.open).toHaveBeenCalledWith(
      'Error en el servidor. Estamos trabajando para solucionarlo.',
      'Cerrar',
      expect.any(Object)
    );
  });

  it('should handle structured backend error and show snackbar', () => {
    http.get('/test').subscribe({
      next: () => expect.fail('Should have failed with 400 error'),
      error: (error: HttpErrorResponse) => {
        expect(error.status).toBe(400);
      }
    });

    const req = httpTestingController.expectOne('/test');
    req.flush({ message: 'El usuario ya existe' }, { status: 400, statusText: 'Bad Request' });

    expect(snackBarSpy.open).toHaveBeenCalledWith(
      'El usuario ya existe',
      'Cerrar',
      expect.any(Object)
    );
  });
});
