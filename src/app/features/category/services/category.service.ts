import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { delay, map, tap } from 'rxjs/operators';

import { Category } from '../models/category-model';
import { environment } from '../../../../environments/environment';
@Injectable({ providedIn: 'root' })
export class CategoryService {
  private useMock = false;
  constructor(private http: HttpClient) {}
  // private http = Inject(HttpClient);

  // ---------------- MOCK DATA ----------------
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

  // ---------------- GET ALL ----------------
  getAll(): Observable<Category[]> {
    if (this.useMock) {
      return of(this.mockData);
    }

    return this.http.get<any>(`${environment.apiUrl}/admin/category/list`).pipe(
      map((res) => res.data || []), // always return array
    );
  }

  create(payload: Partial<Category>): Observable<any> {
    return this.http.post(`${environment.apiUrl}/categories`, payload);
  }

  update(id: number, payload: Partial<Category>): Observable<any> {
    return this.http.put(`${environment.apiUrl}/categories/${id}`, payload);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/categories/${id}`);
  }
}
