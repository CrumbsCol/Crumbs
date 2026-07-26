import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach } from 'vitest';
import { Component } from '@angular/core';
import { TableComponent, TableColumn, TableColumnDefDirective } from './table.component';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <app-table [data]="testData" [columns]="testColumns" (rowClick)="onRowClick($event)">
      <ng-template appTableColumnDef="customCol" let-element>
        <span class="custom-badge">{{ element.customCol }} - Badge</span>
      </ng-template>
      <div empty-state>No data available</div>
    </app-table>
  `,
  imports: [TableComponent, TableColumnDefDirective, CommonModule]
})
class TestHostComponent {
  testData = [
    { id: 1, name: 'Item 1', customCol: 'Custom 1', date: new Date('2023-01-01'), price: 100 },
    { id: 2, name: 'Item 2', customCol: 'Custom 2', date: new Date('2023-01-02'), price: 200 }
  ];
  
  testColumns: TableColumn[] = [
    { key: 'name', header: 'Name', type: 'text' },
    { key: 'customCol', header: 'Custom Column' },
    { key: 'date', header: 'Date', type: 'date', format: 'yyyy-MM-dd' },
    { key: 'price', header: 'Price', type: 'currency', format: 'USD' }
  ];

  clickedRow: unknown;

  onRowClick(row: unknown) {
    this.clickedRow = row;
  }
}

describe('TableComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render correct number of rows', () => {
    const rows = fixture.debugElement.queryAll(By.css('mat-row'));
    expect(rows.length).toBe(2);
  });

  it('should render custom template', () => {
    const customCell = fixture.debugElement.query(By.css('.custom-badge'));
    expect(customCell.nativeElement.textContent).toContain('Custom 1 - Badge');
  });

  it('should emit rowClick event when row is clicked', () => {
    const firstRow = fixture.debugElement.query(By.css('mat-row'));
    firstRow.triggerEventHandler('click', null);
    expect(component.clickedRow).toEqual(component.testData[0]);
  });

  it('should display empty state when data is empty', () => {
    const emptyFixture = TestBed.createComponent(TestHostComponent);
    emptyFixture.componentInstance.testData = [];
    emptyFixture.detectChanges();
    
    const emptyState = emptyFixture.debugElement.query(By.css('.empty-state'));
    expect(emptyState).toBeTruthy();
    expect(emptyState.nativeElement.textContent).toContain('No data available');
  });
});
