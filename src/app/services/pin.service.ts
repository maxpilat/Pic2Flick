import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

export type Pin = {
  id: number;
  urls: {
    raw: string;
  };
};

export const FILMS_MOCK: Pin[] = [
  {
    id: 1,
    urls: {
      raw: 'https://img.freepik.com/free-photo/digital-art-cosmic-star-illustration_23-2151572565.jpg?semt=ais_hybrid',
    },
  },
  {
    id: 2,
    urls: {
      raw: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHQT3_E599bDANzTDfsQxvOsFbI0rpcgtO3g&s',
    },
  },
  { id: 3, urls: { raw: 'https://i.pinimg.com/736x/46/fd/4f/46fd4f4798c1e7da969be851371494a1.jpg' } },
  { id: 4, urls: { raw: 'https://i.pinimg.com/736x/52/8a/42/528a424b2d0913f0354b6d6347afb343.jpg' } },
  { id: 5, urls: { raw: 'https://i.pinimg.com/736x/b5/79/86/b57986311812642a3a7ef6bc16509f71.jpg' } },
  { id: 6, urls: { raw: 'https://i.pinimg.com/736x/7f/ea/66/7fea668afab70a255e1ae43c56aa5310.jpg' } },
  {
    id: 7,
    urls: {
      raw: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeGR9XzyvRCVDcnT2IL7xvrS63vM5OGZ_KEQ&s',
    },
  },
  {
    id: 8,
    urls: {
      raw: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZmTHCBfRcIzZwr70LHvjmlGoByD2Z86ATew&s',
    },
  },
  {
    id: 9,
    urls: {
      raw: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0RTevtEKGuGjjApnuyLDsIiVZXDo4kgGNlQ&s',
    },
  },
  {
    id: 10,
    urls: {
      raw: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6LfKk4v8kzQq45CzHPndsTtJb2tlBVRPXUQ&s',
    },
  },
];

@Injectable({
  providedIn: 'root',
})
export class PinService {
  private getPinsUrl = 'https://api.unsplash.com/photos?client_id=kQ6xg4d5ZklemPe-j7h9FkngtAQOS1_0Lm2ax6O-foE';
  private activePin = new BehaviorSubject<Pin | null>(null);
  private currentId = FILMS_MOCK.length + 1;

  constructor(private http: HttpClient) {}

  getPins(page: number, perPage = 20): Observable<Pin[]> {
    return of(this.assignUniqueIds(FILMS_MOCK));
  }

  private assignUniqueIds(pins: Pin[]): Pin[] {
    return pins.map((pin) => ({
      ...pin,
      id: this.currentId++,
    }));
  }

  setActivePin(pin: Pin | null) {
    this.activePin.next(pin);
  }

  getActivePin() {
    return this.activePin.getValue();
  }
}
