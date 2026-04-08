import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Exhibition } from '@features/exhibition-management/models/exhibition-model';
import { ExhibitionService } from '@features/exhibition-management/services/exhibition.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PageHeader } from '@shared/components/page-header/page-header';
import { Table } from '@shared/components/table/table';

import { ConfirmDialoge } from '@shared/components/confirm-dialoge/confirm-dialoge';
import { Toast } from '@shared/components/toast/toast';
import { TableColumn } from '@shared/models/table-column.model';
import { HeaderService } from '@shared/services/header.service';

@Component({
  selector: 'app-exhibition-management',
  templateUrl: './exhibition-management.html',
  providers: [ConfirmationService, MessageService],
  imports: [PageHeader, Table, ConfirmDialoge, Toast],
})
export class ExhibitionManagement implements OnInit {
  searchText = '';
  exhibitionList: Exhibition[] = [];
  filteredList: Exhibition[] = [];

  statusFilter = 'all';

  columns: TableColumn[] = [
    {
      field: 'logo',
      header: 'Logo',
      type: 'avatar',
      imageField: 'logo',
    },
    {
      field: 'name',
      header: 'Name',
      type: 'text',
    },
    {
      field: 'address',
      header: 'Address',
      type: 'text',
    },
    {
      field: 'startDate',
      header: 'Start Date',
      type: 'date',
    },
    {
      field: 'endDate',
      header: 'End Date',
      type: 'date',
    },
    {
      field: 'status',
      header: 'Status',
      type: 'tag',
    },
  ];

  constructor(
    private exhibitionService: ExhibitionService,
    private headerService: HeaderService,

    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ) {}

  ngOnInit() {
    this.headerService.setHeader(
      'Exhibition Management',
      'Manage all your exhibition.',
      'pi pi-calendar',
    );

    this.exhibitionService.getAll().subscribe((data) => {
      this.exhibitionList = data;
      this.applyFilters();
    });
  }

  addExhibition() {
    this.router.navigate(['/exhibition-management/add-exhibition']);
  }

  onDelete(item: Exhibition) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to remove this exhibition?',
      header: 'Remove exhibition?',

      acceptLabel: 'Confirm',
      rejectLabel: 'Cancel',
      rejectButtonStyleClass: 'p-button-outlined',

      accept: () => {
        this.exhibitionService.delete(item.id);
        this.messageService.add({
          severity: 'success',
          detail: 'Exhibition removed successfully',
        });
      },
    });
  }
  onEdit(item: any) {
    this.router.navigate(['/exhibition-management/edit-exhibition', item.id]);
  }

  onSearch(value: string) {
    this.searchText = value;
    this.applyFilters();
  }

  applyFilters() {
    const q = this.searchText.toLowerCase();

    this.filteredList = this.exhibitionList.filter((e) => {
      return e.name.toLowerCase().includes(q) || e.address.toLowerCase().includes(q);
    });
  }
}
