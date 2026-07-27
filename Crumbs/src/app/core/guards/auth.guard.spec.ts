import { describe, it, expect, beforeEach, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { PLATFORM_ID, signal } from '@angular/core';
import { authGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';

describe('AuthGuard', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let routerMock: any;

  beforeEach(() => {
    routerMock = { createUrlTree: vi.fn() };
  });

  const setupAndRun = (isAuthenticated: boolean, initialized: boolean) => {
    const isAuthSignal = signal(isAuthenticated);
    const initializedSignal = signal(initialized);

    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: routerMock },
        {
          provide: AuthService,
          useValue: {
            isAuthenticated: isAuthSignal,
            initialized: initializedSignal,
          },
        },
        { provide: PLATFORM_ID, useValue: 'browser' },
      ],
    });

    return TestBed.runInInjectionContext(() => authGuard({} as never, {} as never));
  };

  it('should allow access if user is authenticated and initialized', () => {
    const result = setupAndRun(true, true);
    expect(result).toBe(true);
  });

  it('should redirect to login if not authenticated and initialized', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mockUrlTree = { toString: () => '/login' } as any;
    routerMock.createUrlTree.mockReturnValue(mockUrlTree);

    const result = setupAndRun(false, true);
    expect(result).toBe(mockUrlTree);
    expect(routerMock.createUrlTree).toHaveBeenCalledWith(['/login']);
  });
});
