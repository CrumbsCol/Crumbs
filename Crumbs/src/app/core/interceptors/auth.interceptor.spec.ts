import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { authInterceptor } from './auth.interceptor';

describe('AuthInterceptor', () => {
  let http: HttpClient;
  let httpTestingController: HttpTestingController;
  let store: Record<string, string>;

  beforeEach(() => {
    store = {};

    const localStorageMock = {
      getItem: vi.fn((key: string) => store[key] ?? null),
      setItem: vi.fn((key: string, value: string) => { store[key] = value; }),
      removeItem: vi.fn((key: string) => { delete store[key]; }),
      clear: vi.fn(() => { store = {}; }),
      get length() { return Object.keys(store).length; },
      key: vi.fn((index: number) => Object.keys(store)[index] ?? null),
    };

    Object.defineProperty(globalThis, 'localStorage', {
      value: localStorageMock,
      writable: true,
      configurable: true,
    });

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([authInterceptor])),
        provideHttpClientTesting(),
        { provide: Router, useValue: { navigate: vi.fn() } },
      ],
    });

    http = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should add Authorization header if token exists', () => {
    store['access_token'] = 'mock-jwt-token';

    http.get('/api/protected').subscribe();

    const req = httpTestingController.expectOne('/api/protected');
    expect(req.request.headers.has('Authorization')).toBe(true);
    expect(req.request.headers.get('Authorization')).toBe('Bearer mock-jwt-token');
    req.flush({});
  });

  it('should NOT add Authorization header if token is absent', () => {
    http.get('/api/unprotected').subscribe();

    const req = httpTestingController.expectOne('/api/unprotected');
    expect(req.request.headers.has('Authorization')).toBe(false);
    req.flush({});
  });
});
