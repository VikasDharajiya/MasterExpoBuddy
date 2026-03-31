import { Component, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ChangePasswordDialog } from './components/change-password-dialog/change-password-dialog';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    ChangePasswordDialog,
  ],
  providers: [MessageService],
  templateUrl: './profile.html',
})
export class Profile {
  showPasswordDialog = false;
  previewUrl: string | null = 'https://i.pravatar.cc/80?img=12';

  form = {
    name: 'Floyd Miles',
    email: 'felicia.reid@example.com',
  };

  originalForm = { ...this.form };

  constructor(
    private messageService: MessageService,
    private ngZone: NgZone,
  ) {}

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.ngZone.run(() => (this.previewUrl = reader.result as string));
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage() {
    this.previewUrl = null;
  }

  onApply() {
    this.originalForm = { ...this.form };
    this.messageService.add({
      severity: 'success',
      detail: 'Profile updated successfully.',
      life: 3000,
    });
  }

  onDiscard() {
    this.form = { ...this.originalForm };
  }

  onPasswordSave(form: any) {
    this.messageService.add({
      severity: 'success',
      detail: 'Password changed successfully.',
      life: 3000,
    });
  }
}
