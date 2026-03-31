import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Category } from '../models/category-model';

@Injectable({ providedIn: 'root' })
export class categoryService {
  private mockData: Category[] = [
    {
      id: 1,
      name: 'Technology & IT',
      sequence: 1,
      status: 'Active',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      catalogueFile: { name: 'catalogue.pdf', size: '120KB' },
    },
    {
      id: 2,
      name: 'Electronics & Gadgets',
      sequence: 2,
      status: 'Active',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      // catalogueFile: { name: 'catalogue.pdf', size: '120KB' },
    },
    {
      id: 3,
      name: 'Furniture & Interior',
      sequence: 3,
      status: 'Active',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      // catalogueFile: { name: 'catalogue.pdf', size: '120KB' },
    },
    {
      id: 4,
      name: 'Apparel & Fashion',
      sequence: 4,
      status: 'Active',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      catalogueFile: { name: 'catalogue.pdf', size: '120KB' },
      // lastLoggedIn: '09/15/2023 11:22 PM',
      // avatar: 'https://i.pravatar.cc/36?img=33',
    },
    {
      id: 5,
      name: 'Food & Beverages',
      sequence: 5,
      status: 'Active',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      catalogueFile: { name: 'catalogue.pdf', size: '120KB' },
      // lastLoggedIn: '11/28/2023 05:45 AM',
      // avatar: 'https://i.pravatar.cc/36?img=41',
    },
    {
      id: 6,
      name: 'Health & Wellness',
      sequence: 6,
      status: 'Active',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      catalogueFile: { name: 'catalogue.pdf', size: '120KB' },
      // lastLoggedIn: '05/03/2023 03:17 PM',
      // avatar: 'https://i.pravatar.cc/36?img=59',
    },
    {
      id: 7,
      name: 'Automotive & Transportation',
      sequence: 7,
      status: 'Inactive',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      catalogueFile: { name: 'catalogue.pdf', size: '120KB' },
      // lastLoggedIn: '08/07/2023 01:26 PM',
      // avatar: 'https://i.pravatar.cc/36?img=68',
    },
    {
      id: 8,
      name: 'Sports & Outdoor',
      sequence: 8,
      status: 'Active',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      catalogueFile: { name: 'catalogue.pdf', size: '120KB' },
      // lastLoggedIn: '01/10/2024 09:00 AM',
      // avatar: 'https://i.pravatar.cc/36?img=44',
    },
  ];

  //  Main reactive store
  private staffSubject = new BehaviorSubject<Category[]>([...this.mockData]);

  //  Public stream
  staff$ = this.staffSubject.asObservable();

  // Get all
  getAll(): Observable<Category[]> {
    return this.staff$;
  }

  // Create
  create(payload: Partial<Category>): void {
    const newStaff: Category = {
      id: Date.now(),
      name: payload.name || '',
      sequence: payload.sequence || 0,
      status: (payload.status as 'Active' | 'Inactive') || 'Active',
      description: payload.description || '',
      catalogueFile: payload.catalogueFile,
    };

    this.mockData.push(newStaff);
    this.staffSubject.next([...this.mockData]); //  trigger update
  }

  //  Update
  update(id: number, payload: Partial<Category>): void {
    const index = this.mockData.findIndex((s) => s.id === id);

    if (index > -1) {
      this.mockData[index] = {
        ...this.mockData[index],
        ...payload,
      } as Category;

      this.staffSubject.next([...this.mockData]); //  trigger update
    }
  }

  // Delete
  delete(id: number): void {
    this.mockData = this.mockData.filter((s) => s.id !== id);
    this.staffSubject.next([...this.mockData]); //  trigger update
  }
}
