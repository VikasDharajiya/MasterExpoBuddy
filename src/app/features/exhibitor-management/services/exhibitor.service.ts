import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Exhibitor } from '../models/exhibitor.model';

@Injectable({ providedIn: 'root' })
export class ExhibitorService {
  private mockData: Exhibitor[] = [
    {
      id: 1,
      name: 'Artify Studio',
      staffLimit: 10,
      exhibitionLimit: 2,
      exhibitionId: 1,
      exhibitionName: 'Modern Art Fair',
      logo: 'https://picsum.photos/41?random=1',
      primaryColor: '#ff5733',
      secondaryColor: '#33c1ff',
      storageLimit: 500,
      status: 'Active',
      isActive: true,
    },
  ];

  private subject = new BehaviorSubject<Exhibitor[]>([...this.mockData]);
  exhibitor$ = this.subject.asObservable();

  getAll(): Observable<Exhibitor[]> {
    return this.exhibitor$;
  }

  create(payload: Partial<Exhibitor>) {
    const isActive = payload.isActive ?? true;
    const newItem: Exhibitor = {
      id: Date.now(),
      name: payload.name || '',
      staffLimit: payload.staffLimit || 0,
      exhibitionLimit: payload.exhibitionLimit || 0,
      exhibitionId: payload.exhibitionId!,
      exhibitionName: payload.exhibitionName || '',
      logo: payload.logo || '',
      primaryColor: payload.primaryColor || '#000000',
      secondaryColor: payload.secondaryColor || '#ffffff',
      storageLimit: payload.storageLimit || 0,
      isActive,
      status: isActive ? 'Active' : 'Inactive',
    };

    this.mockData.push(newItem);
    this.subject.next([...this.mockData]);
  }

  delete(id: number) {
    this.mockData = this.mockData.filter((e) => e.id !== id);
    this.subject.next([...this.mockData]);
  }

  getById(id: number) {
    return this.mockData.find((e) => e.id === id);
  }

  update(id: number, payload: Partial<Exhibitor>) {
    const index = this.mockData.findIndex((e) => e.id === id);

    if (index > -1) {
      const isActive = payload.isActive ?? this.mockData[index].isActive;

      this.mockData[index] = {
        ...this.mockData[index],
        ...payload,
        isActive,
        status: isActive ? 'Active' : 'Inactive',
      };

      this.subject.next([...this.mockData]);
    }
  }
}
