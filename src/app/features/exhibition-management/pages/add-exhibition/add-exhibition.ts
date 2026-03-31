import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { ExhibitionService } from '@features/exhibition-management/services/exhibition.service';
import { HeaderService } from '@shared/services/header.service';
import { Toast } from '@shared/components/toast/toast';
import { MessageService } from 'primeng/api';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    DatePickerModule,
    Toast,
    ButtonModule,
    ToggleSwitchModule,
  ],
  providers: [MessageService],
  templateUrl: './add-exhibition.html',
})
export class AddExhibition {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private exhibitionService: ExhibitionService,
    private headerService: HeaderService,
    private messageService: MessageService,
  ) {}

  ngOnInit() {
    this.headerService.setHeader(
      'Exhibition Management',
      'Manage all your exhibition.',
      'pi pi-users',
    );
    this.form = this.fb.group({
      name: [''],
      logo: [''],
      startDate: [null],
      endDate: [null],
      location: [''],
      isActive: [false],
    });

    // check edit
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isEditMode = true;
      this.editId = +id;

      const data = this.exhibitionService.getById(this.editId);

      if (data) {
        this.form.patchValue(data);

        // also set preview
        this.logoPreview = data.logo;
      }
    }
  }

  isEditMode = false;
  editId: number | null = null;

  logoFile: File | null = null;
  logoPreview: string | null = null;

  onLogoSelect(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    this.logoFile = file;

    const reader = new FileReader();
    reader.onload = () => {
      this.logoPreview = reader.result as string;

      // patch AFTER file is read
      this.form.patchValue({
        logo: this.logoPreview,
      });
    };

    reader.readAsDataURL(file);
  }

  goBack() {
    this.router.navigate(['/exhibition-management']);
  }

  submit() {
    if (this.form.valid) {
      if (this.isEditMode) {
        this.exhibitionService.update(this.editId!, this.form.value);

        this.messageService.add({
          severity: 'success',
          summary: 'Updated',
          detail: 'Exhibition updated successfully',
          life: 3000,
        });
      } else {
        this.exhibitionService.create(this.form.value);

        this.messageService.add({
          severity: 'success',
          summary: 'Created',
          detail: 'Exhibition added successfully',
          life: 3000,
        });
      }

      setTimeout(() => {
        this.router.navigate(['/exhibition-management']);
      }, 900);

      //
      // this.form.reset({
      //   isActive: false,
      // });

      // //
      // this.logoFile = null;
      // this.logoPreview = null;
    } else {
      this.form.markAllAsTouched();
    }
  }
}
