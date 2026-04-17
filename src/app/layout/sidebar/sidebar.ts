import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { TooltipModule } from 'primeng/tooltip';
import { RippleModule } from 'primeng/ripple';
import { NavItem, User } from './models/sidebar.model';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, TooltipModule, RippleModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css'],
})
export class Sidebar {
  constructor(private router: Router) {}

  @Input() collapsed = false;
  @Output() collapsedChange = new EventEmitter<boolean>();

  // @Output() logoutClick = new EventEmitter<void>();

  // @Input() currentUser!: User;
  // @Input() navItems: NavItem[] = [];
  // @Input() bottomItems: NavItem[] = [];

  currentUser: User = {
    name: 'Floyd Miles',
    email: 'felicia.reid@example.com',
    avatar: 'https://i.pravatar.cc/40?img=12',
  };

  navItems: NavItem[] = [
    {
      label: 'Dashboard',
      icon: 'pi pi-home',
      route: '/dashboard',
    },
    {
      label: 'Exhibition Management',
      icon: 'pi pi-calendar',
      route: '/exhibition-management',
    },
    {
      label: 'Exhibitor Management',
      icon: 'pi pi-briefcase',
      route: '/exhibitor-management',
    },
    // {
    //   label: 'Product Management',
    //   icon: 'pi pi-box',
    //   route: '/product-management',
    // },
    // {
    //   label: 'Lead Management',
    //   icon: 'pi pi-user',
    //   route: '/lead-management',
    // },
  ];

  bottomItems: NavItem[] = [
    // { label: 'Settings', icon: 'pi pi-cog', route: '/settings' },
    // {
    //   label: 'Notifications',
    //   icon: 'pi pi-bell',
    //   route: '/notifications',
    //   badge: 3,
    // },
  ];

  toggleSidebar() {
    this.collapsed = !this.collapsed;
    this.collapsedChange.emit(this.collapsed);
  }

  logout() {
    this.router.navigate(['/login']);
    console.log('Logging out...');
  }

  // logout() {
  //   this.logoutClick.emit();
  // }
}
