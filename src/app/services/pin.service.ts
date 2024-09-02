import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pin } from '../store/models/pin.model';

@Injectable({
  providedIn: 'root',
})
export class PinService {
  constructor(private http: HttpClient) {}

  private baseUrl = 'https://api.unsplash.com';
  private clientId = 'kQ6xg4d5ZklemPe-j7h9FkngtAQOS1_0Lm2ax6O-foE';

  getPins(page: number) {
    return this.http.get<Pin[]>(`${this.baseUrl}/photos/?page=${page}&per_page=20&client_id=${this.clientId}`);
  }
}
