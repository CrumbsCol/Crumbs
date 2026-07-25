import { describe, it, expect, beforeEach, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { authGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';

describe('AuthGuard', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let routerSpy: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let authServiceSpy: any;

  beforeEach(() => {
    routerSpy = { createUrlTree: vi.fn() };
    authServiceSpy = { isAuthenticated: vi.fn() };

    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: AuthService, useValue: authServiceSpy }
      ]
    });
  });

  const runGuard = () => TestBed.runInInjectionContext(() => {
    const route = {} as ActivatedRouteSnapshot;
    const state = {} as RouterStateSnapshot;
    return authGuard(route, state);
  });

  it('should allow access if user is authenticated', () => {
    authServiceSpy.isAuthenticated.mockReturnValue(true);
    
    const result = runGuard();
    
    expect(result).toBe(true);
    expect(routerSpy.createUrlTree).not.toHaveBeenCalled();
  });

  it('should deny access and redirect to login if user is not authenticated', () => {
    authServiceSpy.isAuthenticated.mockReturnValue(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mockUrlTree = {} as any;
    routerSpy.createUrlTree.mockReturnValue(mockUrlTree);
    
    const result = runGuard();
    
    expect(result).toBe(mockUrlTree);
    expect(routerSpy.createUrlTree).toHaveBeenCalledWith(['/login']);
  });
});
