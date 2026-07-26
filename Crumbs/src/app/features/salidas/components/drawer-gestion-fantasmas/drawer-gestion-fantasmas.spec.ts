import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DrawerGestionFantasmas } from './drawer-gestion-fantasmas';

describe('DrawerGestionFantasmas', () => {
  let component: DrawerGestionFantasmas;
  let fixture: ComponentFixture<DrawerGestionFantasmas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrawerGestionFantasmas],
    }).compileComponents();
    fixture = TestBed.createComponent(DrawerGestionFantasmas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });
});
