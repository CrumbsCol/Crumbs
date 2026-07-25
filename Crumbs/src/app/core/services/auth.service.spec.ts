import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
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

  beforeEach(() => {
    const spy = { navigate: vi.fn() };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        UserService,
        { provide: Router, useValue: spy }
      ]
    });

    service = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    routerSpy = TestBed.inject(Router) as any;
    userService = TestBed.inject(UserService);
    
    // Default to mock mode false for tests unless specified
    environment.useMocks = false;
    
    vi.spyOn(Storage.prototype, 'setItem');
    vi.spyOn(Storage.prototype, 'removeItem');
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);
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
      user: { id: '1', nombre: 'Real User', email: 'test@example.com', userName: 'real', fechaNacimiento: '01/01/2000', avatarUrl: null }
    });

    expect(Storage.prototype.setItem).toHaveBeenCalledWith('access_token', 'real-token');
    expect(userService.currentUser()?.nombre).toBe('Real User');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should perform mock login when useMocks is true', () => {
    environment.useMocks = true;

    service.login({ emailOrUsername: 'test@example.com', password: 'password' }).subscribe();

    expect(Storage.prototype.setItem).toHaveBeenCalledWith('access_token', 'mock-jwt-token-for-development');
    expect(userService.currentUser()?.id).toBe('mock-user-001');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/dashboard']);
    
    // Verify no HTTP request was made
    httpTestingController.expectNone(`${environment.apiUrl}/auth/login`);
  });

  it('should logout correctly', () => {
    service.logout();
    
    expect(Storage.prototype.removeItem).toHaveBeenCalledWith('access_token');
    expect(userService.currentUser()).toBeNull();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should not autologin if no token exists', () => {
    service.autoLogin().subscribe();
    expect(userService.currentUser()).toBeNull();
  });

  it('should autologin if token exists in mock mode', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (Storage.prototype.getItem as any).mockReturnValue('some-token');
    environment.useMocks = true;
    
    service.autoLogin().subscribe();
    
    expect(userService.currentUser()?.id).toBe('mock-user-001');
  });

  it('should autologin with real API if token exists and not in mock mode', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (Storage.prototype.getItem as any).mockReturnValue('real-token');
    
    service.autoLogin().subscribe();
    
    const req = httpTestingController.expectOne(`${environment.apiUrl}/me`);
    expect(req.request.method).toEqual('GET');
    
    req.flush({ id: '2', nombre: 'Real Autologin', email: 'test@example.com', userName: 'real2', fechaNacimiento: '01/01/2000', avatarUrl: null });
    
    expect(userService.currentUser()?.nombre).toBe('Real Autologin');
  });

  it('should handle autologin failure (invalid token)', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (Storage.prototype.getItem as any).mockReturnValue('bad-token');
    
    service.autoLogin().subscribe();
    
    const req = httpTestingController.expectOne(`${environment.apiUrl}/me`);
    req.flush('Unauthorized', { status: 401, statusText: 'Unauthorized' });
    
    expect(Storage.prototype.removeItem).toHaveBeenCalledWith('access_token');
    expect(userService.currentUser()).toBeNull();
  });
});
