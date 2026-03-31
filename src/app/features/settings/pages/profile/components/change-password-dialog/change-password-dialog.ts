import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { BaseDialoge } from '../../../../../../shared/components/base-dialoge/base-dialoge';
import { PasswordForm, PasswordRule } from '../../models/password.model';

@Component({
  selector: 'app-change-password-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, PasswordModule, BaseDialoge],
  templateUrl: './change-password-dialog.html',
})
export class ChangePasswordDialog implements OnChanges {
  @Input() visible = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() save = new EventEmitter<PasswordForm>();

  form: PasswordForm = { currentPassword: '', newPassword: '', confirmPassword: '' };

  rules: PasswordRule[] = [
    { label: 'At least 1 uppercase', valid: false, test: (pw) => /[A-Z]/.test(pw) },
    { label: 'At least 1 lowercase', valid: false, test: (pw) => /[a-z]/.test(pw) },
    { label: 'At least 1 number', valid: false, test: (pw) => /[0-9]/.test(pw) },
    { label: 'At least 1 special character', valid: false, test: (pw) => /[^A-Za-z0-9]/.test(pw) },
    { label: 'At least 8 characters', valid: false, test: (pw) => pw.length >= 8 },
  ];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['visible']?.currentValue === true) {
      this.form = { currentPassword: '', newPassword: '', confirmPassword: '' };
      this.rules.forEach((r) => (r.valid = false));
    }
  }

  checkStrength() {
    this.rules.forEach((r) => (r.valid = r.test(this.form.newPassword)));
  }

  onSubmit() {
    if (!this.form.currentPassword || !this.form.newPassword || !this.form.confirmPassword) return;
    if (this.form.newPassword !== this.form.confirmPassword) return;
    this.save.emit({ ...this.form });
    this.visibleChange.emit(false);
  }

  onCancel() {
    this.visibleChange.emit(false);
  }
}
