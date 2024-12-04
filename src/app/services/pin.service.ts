import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export type Pin = {
  id: number;
  urls: {
    raw: string;
  };
};

@Injectable({
  providedIn: 'root',
})
export class PinService {
  private getPinsUrl = 'https://api.unsplash.com/photos?client_id=kQ6xg4d5ZklemPe-j7h9FkngtAQOS1_0Lm2ax6O-foE';

  constructor(private http: HttpClient) {}

  getPins(page: number, perPage = 20): Observable<Pin[]> {
    const url = `${this.getPinsUrl}&page=${page}&per_page=${perPage}`;
    return this.http.get<Pin[]>(url);
  }
}
