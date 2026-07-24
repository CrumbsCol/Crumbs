import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach } from 'vitest';

import { LoginBranding } from './login-branding';

describe('LoginBranding', () => {
  let component: LoginBranding;
  let fixture: ComponentFixture<LoginBranding>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginBranding],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginBranding);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the app title "Crumbs"', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const title = compiled.querySelector('.branding-title');
    expect(title?.textContent).toContain('Crumbs');
  });

  it('should render the subtitle', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const subtitle = compiled.querySelector('.branding-subtitle');
    expect(subtitle?.textContent).toContain('Divide gastos');
  });
});
