import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { AutoComplete, AutoCompleteModule } from 'primeng/autocomplete';
import { EditorModule } from 'primeng/editor';

import { ExhibitorService } from '@features/exhibitor-management/services/exhibitor.service';
import { ExhibitionService } from '@features/exhibition-management/services/exhibition.service';
import { Exhibition } from '@features/exhibition-management/models/exhibition-model';

import { HeaderService } from '@shared/services/header.service';
import { Toast } from '@shared/components/toast/toast';
import { MessageService } from 'primeng/api';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    ToggleSwitchModule,
    AutoCompleteModule,
    EditorModule,
    Toast,
  ],
  providers: [MessageService],
  templateUrl: './add-exhibitor.html',
})
export class AddExhibitor implements OnInit {
  @ViewChild('exhibitionAC') exhibitionAC!: AutoComplete;

  form!: FormGroup;
  isEditMode = false;
  editId: number | null = null;

  logoFile: File | null = null;
  logoPreview: string | null = null;

  exhibitions: Exhibition[] = [];
  filteredExhibitions: Exhibition[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private exhibitorService: ExhibitorService,
    private exhibitionService: ExhibitionService,
    private headerService: HeaderService,
    private messageService: MessageService,
  ) {}

  ngOnInit() {
    this.headerService.setHeader(
      'Exhibitor Management',
      'Manage all your exhibitor.',
      'pi pi-briefcase',
    );

    this.form = this.fb.group({
      name: [''],
      companyName: [''],
      email: [''],
      contact1: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      contact2: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      contactPerson: [''],
      reference: [''],
      notes: [''],

      staffLimit: [0],
      exhibitionLimit: [0],
      exhibitionIds: [[]],

      logo: [''],
      primaryColor: ['#000000'],
      secondaryColor: ['#ffffff'],
      storageLimit: [0],
      isActive: [true],
    });

    this.exhibitionService.getAll().subscribe((data) => {
      this.exhibitions = data;
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.editId = +id;

      const data = this.exhibitorService.getById(this.editId);
      if (data) {
        this.form.patchValue(data);
        this.logoPreview = data.logo;
      }
    }
  }

  onExhibitionInputClick() {
    this.filteredExhibitions = [...this.exhibitions];
    this.exhibitionAC.show();
  }

  filterExhibitions(event: any) {
    const query = (event.query || '').toLowerCase();

    this.filteredExhibitions = this.exhibitions.filter((e) => e.name.toLowerCase().includes(query));
  }

  onExhibitionChange() {
    const selected = this.form.value.exhibitionIds || [];
    const limit = this.form.value.exhibitionLimit || 0;

    if (limit && selected.length > limit) {
      selected.pop();

      this.form.patchValue({
        exhibitionIds: selected,
      });

      this.messageService.add({
        severity: 'warn',
        summary: 'Limit reached',
        detail: `Max ${limit} exhibitions allowed`,
      });
    }
  }

  onLogoSelect(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    this.logoFile = file;

    const reader = new FileReader();
    reader.onload = () => {
      this.logoPreview = reader.result as string;
      this.form.patchValue({ logo: this.logoPreview });
    };

    reader.readAsDataURL(file);
  }

  goBack() {
    this.router.navigate(['/exhibitor-management']);
  }

  submit() {
    if (this.form.valid) {
      console.log('Form Value:', this.form.value);
      const selected = this.form.value.exhibitionIds as Exhibition[];

      const payload = {
        ...this.form.value,
        exhibitionIds: (this.form.value.exhibitionIds as Exhibition[]).map((e) => e.id),
        exhibitionNames: selected.map((e) => e.name),
      };

      if (this.isEditMode) {
        this.exhibitorService.update(this.editId!, payload);
      } else {
        this.exhibitorService.create(payload);
      }

      this.messageService.add({
        severity: 'success',
        summary: this.isEditMode ? 'Updated' : 'Created',
        detail: 'Exhibitor saved successfully',
      });

      setTimeout(() => {
        this.router.navigate(['/exhibitor-management']);
      }, 900);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
