import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  title$ = new BehaviorSubject<string>('Default Title');
  subtitle$ = new BehaviorSubject<string>('');
  icon$ = new BehaviorSubject<string>('pi pi-file');

  setHeader(title: string, subtitle: string = '', icon: string = 'pi pi-file') {
    this.title$.next(title);
    this.subtitle$.next(subtitle);
    this.icon$.next(icon);
  }
}
