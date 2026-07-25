import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { authInterceptor } from './auth.interceptor';

describe('AuthInterceptor', () => {
  let http: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
     
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation((key: string) => {
      if (key === 'access_token') return 'mock-jwt-token';
      return null;
    });

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([authInterceptor])),
        provideHttpClientTesting(),
      ]
    });

    http = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should add Authorization header if token exists', () => {
    http.get('/api/protected').subscribe();

    const req = httpTestingController.expectOne('/api/protected');
    expect(req.request.headers.has('Authorization')).toBe(true);
    expect(req.request.headers.get('Authorization')).toBe('Bearer mock-jwt-token');
    req.flush({});
  });

  it('should NOT add Authorization header if token is absent', () => {
    // Override localStorage mock for this specific test
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (Storage.prototype.getItem as any).mockReturnValue(null);

    http.get('/api/unprotected').subscribe();

    const req = httpTestingController.expectOne('/api/unprotected');
    expect(req.request.headers.has('Authorization')).toBe(false);
    req.flush({});
  });
});
