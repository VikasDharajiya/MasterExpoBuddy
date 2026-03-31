import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderService } from '@shared/services/header.service';
import { SettingsMenu } from './models/setting.model';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './settings.html',
  styleUrls: ['./settings.css'],
})
export class Settings implements OnInit {
  menuItems: SettingsMenu[] = [
    { label: 'Profile', icon: 'pi pi-user', route: '/settings/profile' },
    { label: 'Company Profile', icon: 'pi pi-building', route: '/settings/company-profile' },
    { label: 'Email Configuration', icon: 'pi pi-envelope', route: '/settings/email' },
  ];

  constructor(private headerService: HeaderService) {}

  ngOnInit() {
    this.headerService.setHeader(
      'Settings',
      'Manage your preferences and configure various options.',
      'pi pi-cog',
    );
  }
}
