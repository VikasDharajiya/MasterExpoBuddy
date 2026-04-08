import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExhibitorService } from '../../services/exhibitor.service';
import { ConfirmationService, MessageService } from 'primeng/api';

import { PageHeader } from '@shared/components/page-header/page-header';
import { Table } from '@shared/components/table/table';
import { ConfirmDialoge } from '@shared/components/confirm-dialoge/confirm-dialoge';
import { Toast } from '@shared/components/toast/toast';
import { TableColumn } from '@shared/models/table-column.model';
import { HeaderService } from '@shared/services/header.service';
import { Exhibitor } from '@features/exhibitor-management/models/exhibitor.model';

@Component({
  selector: 'app-exhibitor-management',
  templateUrl: './exhibitor-management.html',
  providers: [ConfirmationService, MessageService],
  imports: [PageHeader, Table, ConfirmDialoge, Toast],
})
export class ExhibitorManagement implements OnInit {
  searchText = '';
  exhibitorList: Exhibitor[] = [];
  filteredList: Exhibitor[] = [];

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
      field: 'exhibitionName',
      header: 'Exhibition',
      type: 'text',
    },
    {
      field: 'staffLimit',
      header: 'Staff Limit',
      type: 'text',
    },
    {
      field: 'exhibitionLimit',
      header: 'Exhibition Limit',
      type: 'text',
    },
    {
      field: 'storageLimit',
      header: 'Storage Limit',
      type: 'text',
    },
    {
      field: 'primaryColor',
      header: 'Primary',
      type: 'color', // custom
    },
    {
      field: 'secondaryColor',
      header: 'Secondary',
      type: 'color',
    },
    {
      field: 'status',
      header: 'Status',
      type: 'tag',
    },
  ];

  constructor(
    private exhibitorService: ExhibitorService,
    private headerService: HeaderService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ) {}

  ngOnInit() {
    this.headerService.setHeader(
      'Exhibitor Management',
      'Manage all your exhibitors.',
      'pi pi-briefcase',
    );

    this.exhibitorService.getAll().subscribe((data) => {
      this.exhibitorList = data;
      this.applyFilters();
    });
  }

  addExhibitor() {
    this.router.navigate(['/exhibitor-management/add-exhibitor']);
  }

  onEdit(item: Exhibitor) {
    this.router.navigate(['/exhibitor-management/edit-exhibitor', item.id]);
  }

  onDelete(item: Exhibitor) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to remove this exhibitor?',
      header: 'Remove exhibitor?',
      acceptLabel: 'Confirm',
      rejectLabel: 'Cancel',
      rejectButtonStyleClass: 'p-button-outlined',

      accept: () => {
        this.exhibitorService.delete(item.id);
        this.messageService.add({
          severity: 'success',
          detail: 'Exhibitor removed successfully',
        });
      },
    });
  }

  onSearch(value: string) {
    this.searchText = value;
    this.applyFilters();
  }

  // applyFilters() {
  //   const q = this.searchText.toLowerCase();

  //   this.filteredList = this.exhibitorList.filter((e) => {
  //     return e.name.toLowerCase().includes(q) || e.exhibitionNames.toLowerCase().includes(q);
  //   });
  // }

  applyFilters() {
    const q = this.searchText.toLowerCase();

    this.filteredList = this.exhibitorList.filter((e) => {
      const nameMatch = e.name.toLowerCase().includes(q);

      const exhibitionMatch = (e.exhibitionNames || []).some((name) =>
        name.toLowerCase().includes(q),
      );

      return nameMatch || exhibitionMatch;
    });
  }
}
