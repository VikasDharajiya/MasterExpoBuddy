import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TableColumn } from '../../models/table-column.model';
import { TagModule } from 'primeng/tag';
import { TableModule } from 'primeng/table';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-table',
  imports: [TagModule, TableModule, SelectModule, FormsModule, ButtonModule, DatePipe],
  templateUrl: './table.html',
  styleUrl: './table.css',
})
export class Table {
  @Input() data: any[] = [];
  @Input() columns: TableColumn[] = [];
  @Input() actions: ('view' | 'edit' | 'delete')[] = [];
  @Input() clickableRows = false;

  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Output() rowSelected: EventEmitter<any> = new EventEmitter<any>();

  // @Output() view = new EventEmitter<any>();

  rows: number = 10;

  onRowsChange(value: number) {
    this.rows = value;
  }

  onEdit(row: any) {
    this.edit.emit(row);
  }

  onDelete(row: any) {
    this.delete.emit(row);
  }

  onRowClick(row: any) {
    this.rowSelected.emit({ ...row });
  }

  getTagSeverity(value: string) {
    switch (value) {
      case 'Active':
        return 'success';

      case 'Inactive':
        return 'secondary';

      case 'Live':
        return 'success';

      case 'Upcoming':
        return 'info';

      case 'Completed':
        return 'secondary';

      default:
        return 'secondary';
    }
  }
}
