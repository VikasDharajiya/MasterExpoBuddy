import { Component, OnInit } from '@angular/core';
import { HeaderService } from '@shared/services/header.service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  constructor(private headerService: HeaderService) {}

  ngOnInit() {
    this.headerService.setHeader(
      'Dashboard',
      'Overview of your key information and activities.',
      'pi pi-home',
    );
  }
}
