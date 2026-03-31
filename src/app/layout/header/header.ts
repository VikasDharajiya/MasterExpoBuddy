import { Component } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { HeaderService } from '@shared/services/header.service';
import { Exhibition } from './models/dropdown.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, SelectModule, AsyncPipe],
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
})
export class Header {
  constructor(public headerService: HeaderService) {}

  selectedExhibition = 'all';

  exhibitions: Exhibition[] = [
    { label: 'All Exhibition', value: 'all' },
    { label: 'Summer 2024', value: 'summer2024' },
    { label: 'Winter 2023', value: 'winter2023' },
    { label: 'Spring 2024', value: 'spring2024' },
  ];
}
