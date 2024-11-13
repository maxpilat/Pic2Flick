import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export type Pin = {
  url: string;
};

@Injectable({
  providedIn: 'root',
})
export class PinService {
  constructor() {}

  getPins(page: number, perPage = 20): Observable<Pin[]> {
    return new Observable<Pin[]>((observer) => {
      setTimeout(() => {
        const mockPins: Pin[] = [
          { url: 'https://example.com/photo1.jpg' },
          { url: 'https://example.com/photo2.jpg' },
          { url: 'https://example.com/photo3.jpg' },
          { url: 'https://example.com/photo4.jpg' },
          { url: 'https://example.com/photo5.jpg' },
          { url: 'https://example.com/photo6.jpg' },
          { url: 'https://example.com/photo7.jpg' },
          { url: 'https://example.com/photo8.jpg' },
          { url: 'https://example.com/photo9.jpg' },
          { url: 'https://example.com/photo10.jpg' },
        ];
        observer.next(mockPins);
        observer.complete();
      }, 1000);
    });
  }
}
