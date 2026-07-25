import { describe, it, expect, beforeEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { User } from '../interfaces/user.interface';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have initial state as null', () => {
    expect(service.currentUser()).toBeNull();
  });

  it('should set user correctly', () => {
    const testUser: User = { id: '1', nombre: 'Test', email: 'test@example.com', userName: 'test', fechaNacimiento: '01/01/2000', avatarUrl: null };
    service.setUser(testUser);
    expect(service.currentUser()).toEqual(testUser);
  });

  it('should update user partially', () => {
    const testUser: User = { id: '1', nombre: 'Test', email: 'test@example.com', userName: 'test', fechaNacimiento: '01/01/2000', avatarUrl: null };
    service.setUser(testUser);
    
    service.updateUser({ nombre: 'Updated Name', avatarUrl: 'http://test.com/img.jpg' });
    
    const current = service.currentUser();
    expect(current?.nombre).toBe('Updated Name');
    expect(current?.avatarUrl).toBe('http://test.com/img.jpg');
    expect(current?.email).toBe('test@example.com');
  });

  it('should clear user', () => {
    const testUser: User = { id: '1', nombre: 'Test', email: 'test@example.com', userName: 'test', fechaNacimiento: '01/01/2000', avatarUrl: null };
    service.setUser(testUser);
    expect(service.currentUser()).toBeTruthy();

    service.clearUser();
    expect(service.currentUser()).toBeNull();
  });

  it('should return mock user', () => {
    const mock = service.getMockUser();
    expect(mock).toBeTruthy();
    expect(mock.id).toBe('mock-user-001');
    expect(mock.nombre).toBe('Juan López');
  });
});
