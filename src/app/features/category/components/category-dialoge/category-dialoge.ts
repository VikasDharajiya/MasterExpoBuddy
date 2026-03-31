import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { TagModule } from 'primeng/tag';
import { Category } from '../../models/category-model';
import { BaseDialoge } from '@shared/components/base-dialoge/base-dialoge';

export type DialogMode = 'add' | 'view' | 'edit';

@Component({
  selector: 'app-category-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DialogModule,
    InputTextModule,
    TextareaModule,
    SelectModule,
    ButtonModule,
    RippleModule,
    TagModule,
    BaseDialoge,
  ],
  templateUrl: './category-dialoge.html',
  styleUrls: ['./category-dialoge.css'],
})
export class CategoryDialog implements OnChanges {
  @Input() visible: boolean = false;
  @Input() mode: DialogMode = 'add';
  @Input() category: Partial<Category> = {};

  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() save = new EventEmitter<Partial<Category>>();
  // @Output() switchToEdit = new EventEmitter<void>();

  form: Partial<Category> = {};

  statusOptions = [
    { label: 'Active', value: 'Active' },
    { label: 'Inactive', value: 'Inactive' },
  ];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['visible']?.currentValue === true || changes['category']) {
      this.form = { ...this.category };
    }
  }
  onSubmit() {
    if (!this.form.name?.trim()) return;
    this.save.emit({ ...this.form });
  }
  onCancel() {
    this.visibleChange.emit(false);
  }

  // onSwitchToEdit() {
  //   this.switchToEdit.emit();
  // }

  removeCatalogue() {
    this.form = { ...this.form, catalogueFile: undefined };
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) this.attachFile(file);
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const file = event.dataTransfer?.files?.[0];
    if (file) this.attachFile(file);
  }

  private attachFile(file: File) {
    const sizeKb = Math.round(file.size / 1024);
    const sizeLabel = sizeKb >= 1024 ? (sizeKb / 1024).toFixed(1) + ' MB' : sizeKb + ' KB';

    this.form = {
      ...this.form,
      catalogueFile: { name: file.name, size: sizeLabel },
    };
  }
}
