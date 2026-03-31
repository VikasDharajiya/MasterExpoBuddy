import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-base-dialoge',
  standalone: true,
  imports: [CommonModule, DialogModule, ButtonModule],
  templateUrl: './base-dialoge.html',
})
export class BaseDialoge {
  @Input() visible: boolean = false;
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() icon: string = 'pi pi-file';
  @Input() submitLabel: string = 'Save';
  @Input() width: string = '480px';

  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() submit = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
}
