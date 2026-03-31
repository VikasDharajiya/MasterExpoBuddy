import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

import { Category } from './models/category-model';
import { categoryService } from './services/category.service';
import { CategoryDialog, DialogMode } from './components/category-dialoge/category-dialoge';
import { Table } from '@shared/components/table/table';
import { TableColumn } from '@shared/models/table-column.model';
import { PageHeader } from '@shared/components/page-header/page-header';
import { ConfirmDialoge } from '@shared/components/confirm-dialoge/confirm-dialoge';
import { HeaderService } from '@shared/services/header.service';
import { Toast } from '@shared/components/toast/toast';

@Component({
  selector: 'app-staff-management',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SelectModule,
    ToastModule,
    CategoryDialog,
    Table,
    PageHeader,
    ConfirmDialoge,
    Toast,
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './category.html',
  styleUrls: ['./category.css'],
})
export class CategoryManagement implements OnInit {
  searchText = '';
  showDialog = false;
  dialogMode: DialogMode = 'add';
  // editMode = false;
  selectedCategory: Partial<Category> = {};

  statusFilter = 'all';
  tempStatus = 'all';

  statusOptions = [
    { label: 'All', value: 'all' },
    { label: 'Active', value: 'Active' },
    { label: 'Inactive', value: 'Inactive' },
  ];

  columns: TableColumn[] = [
    { field: 'name', header: 'Category Name', type: 'text', sortable: true },
    { field: 'sequence', header: 'Sequence', type: 'text', sortable: true },
    { field: 'status', header: 'Status', type: 'tag', sortable: true },
    { field: 'description', header: 'Description', type: 'text', sortable: true },
  ];

  staffList: Category[] = [];
  filteredCategory: Category[] = [];

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private headerService: HeaderService,
    private staffService: categoryService,
  ) {}

  ngOnInit() {
    this.headerService.setHeader(
      'Category Management',
      'Manage all your categories.',
      'pi pi-tags',
    );

    //  subscribe once → auto updates forever
    this.staffService.getAll().subscribe((data) => {
      this.staffList = data;
      this.applyAllFilters();
    });
  }

  openAddDialog() {
    this.dialogMode = 'add';
    this.selectedCategory = { status: 'Active' };
    this.showDialog = true;
  }
  // onRowClick(category: Category) {
  //   this.dialogMode = 'view';
  //   this.selectedCategory = { ...category };
  //   this.showDialog = true;
  // }
  onEdit(category: Category) {
    this.dialogMode = 'edit';
    this.selectedCategory = { ...category };
    this.showDialog = true;
  }
  // onSwitchToEdit() {
  //   this.dialogMode = 'edit';
  // }

  onDelete(staff: Category) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to remove this category?',
      header: 'Remove Category?',

      acceptLabel: 'Confirm',
      rejectLabel: 'Cancel',
      rejectButtonStyleClass: 'p-button-outlined',

      accept: () => {
        this.staffService.delete(staff.id); //  no subscribe needed

        this.messageService.add({
          severity: 'success',
          detail: 'Category removed successfully.',
          life: 3000,
        });
      },
    });
  }

  onSave(form: Partial<Category>) {
    if (this.dialogMode === 'edit') {
      this.staffService.update(form.id!, form);
      this.messageService.add({
        severity: 'success',
        detail: 'Category updated successfully.',
        life: 3000,
      });
    } else {
      this.staffService.create(form);
      this.messageService.add({
        severity: 'success',
        detail: 'Category added successfully.',
        life: 3000,
      });
    }

    this.showDialog = false;
  }

  applyAllFilters() {
    const q = this.searchText.toLowerCase();

    this.filteredCategory = this.staffList.filter((c) => {
      const matchSearch = c.name.toLowerCase().includes(q);

      const matchStatus = this.statusFilter === 'all' || c.status === this.statusFilter;

      return matchSearch && matchStatus;
    });
  }

  onSearch(value: string) {
    this.searchText = value;
    this.applyAllFilters();
  }

  applyFilter() {
    this.statusFilter = this.tempStatus;
    this.applyAllFilters();
  }

  clearFilter() {
    this.statusFilter = 'all';
    this.tempStatus = 'all';
    this.applyAllFilters();
  }
}
