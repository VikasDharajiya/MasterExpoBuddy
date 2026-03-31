import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PopoverModule } from 'primeng/popover';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [CommonModule, FormsModule, InputTextModule, ButtonModule, PopoverModule, TooltipModule],
  templateUrl: './page-header.html',
})
export class PageHeader {
  @Input() searchText: string = '';
  @Input() addLabel: string = 'Add New';

  @Output() searchChanged = new EventEmitter<string>();
  @Output() applyFilter = new EventEmitter<void>();
  @Output() clearFilter = new EventEmitter<void>();
  @Output() addClicked = new EventEmitter<void>();
  @Output() exportClicked = new EventEmitter<void>();

  onSearchChange(value: string) {
    this.searchChanged.emit(value);
  }

  onApply() {
    this.applyFilter.emit();
  }

  onClear() {
    this.clearFilter.emit();
  }
}
