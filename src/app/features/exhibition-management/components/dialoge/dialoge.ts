// import {
//   Component,
//   Input,
//   Output,
//   EventEmitter,
//   OnChanges,
//   ChangeDetectorRef,
//   NgZone,
// } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { DialogModule } from 'primeng/dialog';
// import { InputTextModule } from 'primeng/inputtext';
// import { ButtonModule } from 'primeng/button';
// import { RippleModule } from 'primeng/ripple';
// import { Exhibition } from '../../models/exhibition-model';
// import { SelectModule } from 'primeng/select';
// import { PasswordModule } from 'primeng/password';
// import { InputGroupModule } from 'primeng/inputgroup';
// import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
// import { BaseDialoge } from '@shared/components/base-dialoge/base-dialoge';

// @Component({
//   selector: 'app-staff-dialog',
//   standalone: true,
//   imports: [
//     CommonModule,
//     FormsModule,
//     DialogModule,
//     InputTextModule,
//     SelectModule,
//     ButtonModule,
//     RippleModule,
//     PasswordModule,
//     InputGroupModule,
//     InputGroupAddonModule,
//     BaseDialoge,
//   ],
//   templateUrl: './dialoge.html',
//   styleUrls: ['./dialoge.css'],
// })
// export class StaffDialog implements OnChanges {
//   @Input() visible = false;
//   @Input() editMode = false;
//   @Input() staff: Partial<Exhibition> = {};

//   @Output() visibleChange = new EventEmitter<boolean>();
//   @Output() save = new EventEmitter<Partial<Exhibition>>();

//   constructor(
//     private cdr: ChangeDetectorRef,
//     private ngZone: NgZone,
//   ) {}

//   form: Partial<Exhibition> = {};

//   statusOptions = [
//     { label: 'Active', value: 'Active' },
//     { label: 'Inactive', value: 'Inactive' },
//   ];
//   password: string = '';

//   onClose() {
//     this.visibleChange.emit(false);
//   }

//   previewUrl: string | null = null;

//   onFileSelected(event: Event) {
//     const file = (event.target as HTMLInputElement).files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         this.ngZone.run(() => {
//           this.previewUrl = reader.result as string;
//           this.cdr.detectChanges();
//         });
//       };
//       reader.readAsDataURL(file);
//     }
//   }

//   removeImage() {
//     this.previewUrl = null;
//   }

//   selectedCountry = { flag: '🇮🇳', dial: '+91', name: 'India' };

//   countryOptions = [
//     { flag: 'IN', dial: '+91', name: 'India' },
//     { flag: 'US', dial: '+1', name: 'United States' },
//     { flag: 'GB', dial: '+44', name: 'United Kingdom' },
//     { flag: 'AE', dial: '+971', name: 'UAE' },
//     { flag: 'SG', dial: '+65', name: 'Singapore' },
//     { flag: 'AU', dial: '+61', name: 'Australia' },
//     { flag: 'CA', dial: '+1', name: 'Canada' },
//   ];

//   onSave() {
//     this.save.emit({
//       ...this.form,
//       mobile: this.selectedCountry.dial + this.form.mobile,
//       profileImage: this.previewUrl,
//       password: this.password,
//     });
//   }

//   ngOnChanges() {
//     this.form = { ...this.staff };
//     this.password = '';
//     this.previewUrl = this.staff?.profileImage ?? (this.staff as any)?.avatar ?? null;

//     // Strip dial code from mobile if editing
//     if (this.staff?.mobile) {
//       const match = this.countryOptions.find((c) => this.staff!.mobile!.startsWith(c.dial));
//       if (match) {
//         this.selectedCountry = match;
//         this.form.mobile = this.staff.mobile.replace(match.dial, '');
//       } else {
//         this.selectedCountry = this.countryOptions[0];
//       }
//     } else {
//       this.selectedCountry = this.countryOptions[0];
//     }
//   }
// }
