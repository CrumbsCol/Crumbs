import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { environment } from '../../../environments/environment';

describe('AuthService', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let routerSpy: any;
  let userService: UserService;

  // Store for our fake localStorage
  let store: Record<string, string>;

  beforeEach(() => {
    store = {};
    const spy = { navigate: vi.fn() };

    // Mock localStorage globally using Object.defineProperty
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
        provideHttpClient(),
        provideHttpClientTesting(),
        AuthService,
        UserService,
        { provide: Router, useValue: spy },
      ],
    });

    service = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    routerSpy = TestBed.inject(Router) as any;
    userService = TestBed.inject(UserService);

    // Default to mock mode false for tests unless specified
    environment.useMocks = false;
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should perform real login and redirect', () => {
    service.login({ emailOrUsername: 'test@example.com', password: 'password' }).subscribe();

    const req = httpTestingController.expectOne(`${environment.apiUrl}/auth/login`);
    expect(req.request.method).toEqual('POST');

    req.flush({
      accessToken: 'real-token',
      user: { id: '1', nombre: 'Real', apellido: 'User', email: 'test@example.com', userName: 'real', fechaNacimiento: '01/01/2000', avatarUrl: null },
    });

    expect(localStorage.setItem).toHaveBeenCalledWith('access_token', 'real-token');
    expect(userService.currentUser()?.nombre).toBe('Real');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should perform mock login when useMocks is true', () => {
    environment.useMocks = true;

    service.login({ emailOrUsername: 'test@example.com', password: 'password' }).subscribe();

    expect(localStorage.setItem).toHaveBeenCalledWith('access_token', 'mock-jwt-token-for-development');
    expect(userService.currentUser()?.id).toBe('mock-user-001');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/dashboard']);

    // Verify no HTTP request was made
    httpTestingController.expectNone(`${environment.apiUrl}/auth/login`);
  });

  it('should logout correctly', () => {
    service.logout();

    expect(localStorage.removeItem).toHaveBeenCalledWith('access_token');
    expect(userService.currentUser()).toBeNull();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should not autologin if no token exists', () => {
    service.autoLogin().subscribe();
    expect(userService.currentUser()).toBeNull();
  });

  it('should autologin if token exists in mock mode', () => {
    store['access_token'] = 'some-token';
    environment.useMocks = true;

    service.autoLogin().subscribe();

    expect(userService.currentUser()?.id).toBe('mock-user-001');
  });

  it('should autologin with real API if token exists and not in mock mode', () => {
    store['access_token'] = 'real-token';

    service.autoLogin().subscribe();

    const req = httpTestingController.expectOne(`${environment.apiUrl}/me`);
    expect(req.request.method).toEqual('GET');

    req.flush({ id: '2', nombre: 'Real', apellido: 'Autologin', email: 'test@example.com', userName: 'real2', fechaNacimiento: '01/01/2000', avatarUrl: null });

    expect(userService.currentUser()?.nombre).toBe('Real');
  });

  it('should handle autologin failure (invalid token)', () => {
    store['access_token'] = 'bad-token';

    service.autoLogin().subscribe();

    const req = httpTestingController.expectOne(`${environment.apiUrl}/me`);
    req.flush('Unauthorized', { status: 401, statusText: 'Unauthorized' });

    expect(localStorage.removeItem).toHaveBeenCalledWith('access_token');
    expect(userService.currentUser()).toBeNull();
  });
});
