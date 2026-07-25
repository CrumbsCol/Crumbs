import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { AvatarGroupComponent } from './avatar-group';
import { Miembro } from '../../../core/interfaces/salida.interface';
import { By } from '@angular/platform-browser';

@Component({
  template: `<app-avatar-group [miembros]="mockMiembros" [limite]="limite"></app-avatar-group>`,
  imports: [AvatarGroupComponent],
  standalone: true
})
class TestHostComponent {
  mockMiembros: Miembro[] = [];
  limite = 5;
}

describe('AvatarGroupComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, AvatarGroupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render initials correctly', () => {
    component.mockMiembros = [
      { id: '1', nombre: 'Juan Lopez', email: '', userName: '', avatarUrl: null },
      { id: '2', nombre: 'Ana', email: '', userName: '', avatarUrl: null }
    ];
    fixture.detectChanges();

    const avatarElements = fixture.debugElement.queryAll(By.css('.rounded-full'));
    expect(avatarElements.length).toBe(2);
    expect(avatarElements[0].nativeElement.textContent.trim()).toBe('JU');
    expect(avatarElements[1].nativeElement.textContent.trim()).toBe('AN');
  });

  it('should show +N when members exceed the limit', () => {
    component.limite = 2;
    component.mockMiembros = [
      { id: '1', nombre: 'A', email: '', userName: '', avatarUrl: null },
      { id: '2', nombre: 'B', email: '', userName: '', avatarUrl: null },
      { id: '3', nombre: 'C', email: '', userName: '', avatarUrl: null },
      { id: '4', nombre: 'D', email: '', userName: '', avatarUrl: null }
    ];
    fixture.detectChanges();

    const avatarElements = fixture.debugElement.queryAll(By.css('.rounded-full'));
    expect(avatarElements.length).toBe(3); // 2 members + 1 indicator
    
    // The last element should be the indicator
    const indicator = avatarElements[2].nativeElement;
    expect(indicator.textContent.trim()).toBe('+2');
  });
});
