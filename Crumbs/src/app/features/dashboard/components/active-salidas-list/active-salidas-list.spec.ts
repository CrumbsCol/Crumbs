import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveSalidasListComponent } from './active-salidas-list';

describe('ActiveSalidasListComponent', () => {
  let component: ActiveSalidasListComponent;
  let fixture: ComponentFixture<ActiveSalidasListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActiveSalidasListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ActiveSalidasListComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('salidas', []);
    fixture.componentRef.setInput('isEmpty', true);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
