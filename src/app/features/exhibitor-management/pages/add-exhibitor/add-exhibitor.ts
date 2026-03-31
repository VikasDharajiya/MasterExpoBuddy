import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToggleSwitchModule } from 'primeng/toggleswitch';

import { ExhibitorService } from '@features/exhibitor-management/services/exhibitor.service';
import { ExhibitionService } from '@features/exhibition-management/services/exhibition.service';
import { Exhibition } from '@features/exhibition-management/models/exhibition-model';

import { HeaderService } from '@shared/services/header.service';
import { Toast } from '@shared/components/toast/toast';
import { MessageService } from 'primeng/api';
import { SelectModule } from 'primeng/select';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    ToggleSwitchModule,
    SelectModule,
    Toast,
  ],
  providers: [MessageService],
  templateUrl: './add-exhibitor.html',
})
export class AddExhibitor {
  form!: FormGroup;

  isEditMode = false;
  editId: number | null = null;

  logoFile: File | null = null;
  logoPreview: string | null = null;

  exhibitions: Exhibition[] = [];

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
      staffLimit: [0],
      exhibitionLimit: [0],
      exhibitionId: [null],
      exhibitionName: [''],
      logo: [''],
      primaryColor: ['#000000'],
      secondaryColor: ['#ffffff'],
      storageLimit: [0],
      isActive: [true],
    });

    // load exhibitions
    this.exhibitionService.getAll().subscribe((data) => {
      this.exhibitions = data;
    });

    // edit mode
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

  onExhibitionSelect(event: any) {
    const selected = this.exhibitions.find((e) => e.id === event.value);

    this.form.patchValue({
      exhibitionName: selected?.name,
    });
  }

  onLogoSelect(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    this.logoFile = file;

    const reader = new FileReader();
    reader.onload = () => {
      this.logoPreview = reader.result as string;

      this.form.patchValue({
        logo: this.logoPreview,
      });
    };

    reader.readAsDataURL(file);
  }

  goBack() {
    this.router.navigate(['/exhibitor-management']);
  }

  submit() {
    if (this.form.valid) {
      if (this.isEditMode) {
        this.exhibitorService.update(this.editId!, this.form.value);

        this.messageService.add({
          severity: 'success',
          summary: 'Updated',
          detail: 'Exhibitor updated successfully',
          life: 3000,
        });
      } else {
        this.exhibitorService.create(this.form.value);

        this.messageService.add({
          severity: 'success',
          summary: 'Created',
          detail: 'Exhibitor added successfully',
          life: 3000,
        });
      }

      setTimeout(() => {
        this.router.navigate(['/exhibitor-management']);
      }, 900);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
