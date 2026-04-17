import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

import { Category } from './models/category-model';
import { CategoryService } from './services/category.service';
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

  categoryList: Category[] = [];
  filteredCategory: Category[] = [];

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private headerService: HeaderService,
    private categoryService: CategoryService,
  ) {}

  ngOnInit() {
    this.headerService.setHeader(
      'Category Management',
      'Manage all your categories.',
      'pi pi-tags',
    );

    localStorage.setItem(
      'token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImJhNjE1YWVjLTc0NzQtNDA4Ni05ZDljLTZkMDVjYmFlZTQ1NiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InRlc3RAZ21haWwuY29tIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6InRlc3RAZ21haWwuY29tIiwiQXNwTmV0VXNlcklkIjoiYmE2MTVhZWMtNzQ3NC00MDg2LTlkOWMtNmQwNWNiYWVlNDU2IiwiUm9sZSI6IkV4aGliaXRvciIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkV4aGliaXRvciIsIkV4aGliaXRvcklkIjoiMSIsImV4cCI6MjYzOTYyNDQzNywiaXNzIjoiVGVzdC5jb20iLCJhdWQiOiJBdWRpZW5jZSJ9.jFhF-k4-YGCLl7j6Ml4mPBi8aSFrpqHyY_gidE6mFrk',
    );

    this.loadCategories();

    console.log(localStorage.getItem('token'));
  }

  loadCategories() {
    this.categoryService.getAll().subscribe({
      next: (res) => {
        console.log('API DATA ✅', res);
        this.categoryList = res;
        this.applyAllFilters();
      },
      error: (err) => {
        console.log('API ERROR ❌', err);
      },
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
        this.categoryService.delete(staff.id).subscribe(() => {
          this.loadCategories();
        });

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
      this.categoryService.update(form.id!, form).subscribe(() => {
        this.loadCategories(); // refresh after update
      });
    } else {
      this.categoryService.create(form).subscribe(() => {
        this.loadCategories(); // refresh after create
      });
    }

    this.messageService.add({
      severity: 'success',
      detail:
        this.dialogMode === 'edit'
          ? 'Category updated successfully.'
          : 'Category added successfully.',
      life: 3000,
    });

    this.showDialog = false;
  }

  applyAllFilters() {
    const q = this.searchText.toLowerCase();

    this.filteredCategory = this.categoryList.filter((c) => {
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
