import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach } from 'vitest';
import { Component, ViewChild, TemplateRef, OnInit, signal } from '@angular/core';
import { TableComponent, TableColumn } from './table.component';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';

@Component({
  standalone: true,
  template: `
    <app-table 
      [data]="testData()" 
      [columns]="testColumns" 
      [customTemplates]="customTemplates"
      (rowClick)="onRowClick($event)">
      
      <ng-template #customColTemplate let-element>
        <span class="custom-badge">{{ element.customCol }} - Badge</span>
      </ng-template>
      
      <div class="empty-state" empty-state>No data available</div>
    </app-table>
  `,
  imports: [TableComponent, CommonModule]
})
class TestHostComponent implements OnInit {
  @ViewChild('customColTemplate', { static: true }) customColTemplate!: TemplateRef<unknown>;
  
  customTemplates: Record<string, TemplateRef<unknown>> = {};

  ngOnInit() {
    this.customTemplates = { 'customCol': this.customColTemplate };
  }
  
  testData = signal([
    { id: 1, name: 'Item 1', customCol: 'Custom 1', date: new Date('2023-01-01'), price: 100 },
    { id: 2, name: 'Item 2', customCol: 'Custom 2', date: new Date('2023-01-02'), price: 200 }
  ]);

  testColumns: TableColumn[] = [
    { key: 'name', header: 'Name' },
    { key: 'customCol', header: 'Custom' },
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
      imports: [TestHostComponent, TableComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render columns properly', () => {
    const headers = fixture.debugElement.queryAll(By.css('mat-header-cell'));
    expect(headers.length).toBe(4);
    expect(headers[0].nativeElement.textContent.trim()).toBe('Name');
    expect(headers[1].nativeElement.textContent.trim()).toBe('Custom');
  });

  it('should render correct number of rows', () => {
    const rows = fixture.debugElement.queryAll(By.css('mat-row'));
    expect(rows.length).toBe(2);
  });

  it('should render custom template', () => {
    const customCells = fixture.debugElement.queryAll(By.css('.mat-column-customCol .custom-badge'));
    expect(customCells.length).toBe(2);
    expect(customCells[0].nativeElement.textContent.trim()).toBe('Custom 1 - Badge');
  });

  it('should emit rowClick event on row click', () => {
    const row = fixture.debugElement.query(By.css('mat-row'));
    row.triggerEventHandler('click', null);
    
    expect(component.clickedRow).toEqual(component.testData()[0]);
  });

  it('should render empty state when no data provided', () => {
    component.testData.set([]);
    fixture.detectChanges();
    
    const emptyState = fixture.debugElement.query(By.css('.empty-state'));       
    expect(emptyState).toBeTruthy();
    expect(emptyState.nativeElement.textContent).toContain('No data available'); 
  });
});
