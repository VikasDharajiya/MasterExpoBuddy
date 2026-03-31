import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Exhibition {
  id: number;
  name: string;
  logo: string;
  startDate: Date;
  endDate: Date;
  location: string;
  status: 'Upcoming' | 'Live' | 'Completed';
  isActive: boolean;
}

@Injectable({ providedIn: 'root' })
export class ExhibitionService {
  private mockData: Exhibition[] = [
    {
      id: 1,
      name: 'Modern Art Fair',
      logo: 'https://picsum.photos/41?random=1',
      startDate: new Date('2026-03-01'),
      endDate: new Date('2026-03-20'),
      location: 'Mumbai',
      status: 'Completed',
      isActive: false,
    },
    {
      id: 2,
      name: 'Digital Art Expo',
      logo: 'https://picsum.photos/41?random=2',
      startDate: new Date('2026-03-15'),
      endDate: new Date('2026-04-05'),
      location: 'Delhi',
      status: 'Live',
      isActive: true,
    },
    {
      id: 3,
      name: 'Creative Minds Showcase',
      logo: 'https://picsum.photos/41?random=3',
      startDate: new Date('2026-04-10'),
      endDate: new Date('2026-04-25'),
      location: 'Bangalore',
      status: 'Upcoming',
      isActive: false,
    },
    {
      id: 4,
      name: 'Street Art Carnival',
      logo: 'https://picsum.photos/41?random=4',
      startDate: new Date('2026-02-05'),
      endDate: new Date('2026-02-18'),
      location: 'Pune',
      status: 'Completed',
      isActive: false,
    },
    {
      id: 5,
      name: 'AI Art Summit',
      logo: 'https://picsum.photos/41?random=5',
      startDate: new Date('2026-03-20'),
      endDate: new Date('2026-04-10'),
      location: 'Hyderabad',
      status: 'Live',
      isActive: true,
    },
    {
      id: 6,
      name: 'Global Art Connect',
      logo: 'https://picsum.photos/41?random=6',
      startDate: new Date('2026-05-01'),
      endDate: new Date('2026-05-20'),
      location: 'Chennai',
      status: 'Upcoming',
      isActive: false,
    },
    {
      id: 7,
      name: 'Vintage Art Display',
      logo: 'https://picsum.photos/41?random=7',
      startDate: new Date('2026-01-10'),
      endDate: new Date('2026-01-25'),
      location: 'Kolkata',
      status: 'Completed',
      isActive: false,
    },
    {
      id: 8,
      name: 'Future Design Expo',
      logo: 'https://picsum.photos/41?random=8',
      startDate: new Date('2026-04-15'),
      endDate: new Date('2026-05-05'),
      location: 'Ahmedabad',
      status: 'Upcoming',
      isActive: false,
    },
    {
      id: 9,
      name: 'Interactive Art Fest',
      logo: 'https://picsum.photos/41?random=9',
      startDate: new Date('2026-03-10'),
      endDate: new Date('2026-03-30'),
      location: 'Jaipur',
      status: 'Live',
      isActive: true,
    },
  ];

  private exhibitionSubject = new BehaviorSubject<Exhibition[]>([...this.mockData]);
  exhibition$ = this.exhibitionSubject.asObservable();

  getAll(): Observable<Exhibition[]> {
    return this.exhibition$;
  }

  private getStatus(start: Date, end: Date): 'Upcoming' | 'Live' | 'Completed' {
    const now = new Date();

    if (now < start) return 'Upcoming';
    if (now >= start && now <= end) return 'Live';
    return 'Completed';
  }

  create(payload: Partial<Exhibition>): void {
    const newItem: Exhibition = {
      id: Date.now(),
      name: payload.name || '',
      logo: payload.logo || '',
      startDate: payload.startDate!,
      endDate: payload.endDate!,
      location: payload.location || '',
      status: this.getStatus(payload.startDate!, payload.endDate!),
      isActive: payload.isActive ?? true,
    };

    this.mockData.push(newItem);
    this.exhibitionSubject.next([...this.mockData]);
  }

  getById(id: number) {
    return this.mockData.find((item) => item.id === id);
  }

  update(id: number, payload: Partial<Exhibition>): void {
    const index = this.mockData.findIndex((e) => e.id === id);

    if (index > -1) {
      this.mockData[index] = {
        ...this.mockData[index],
        ...payload,
        status: this.getStatus(
          payload.startDate || this.mockData[index].startDate,
          payload.endDate || this.mockData[index].endDate,
        ),
      };

      this.exhibitionSubject.next([...this.mockData]);
    }
  }

  delete(id: number): void {
    this.mockData = this.mockData.filter((e) => e.id !== id);
    this.exhibitionSubject.next([...this.mockData]);
  }
}
