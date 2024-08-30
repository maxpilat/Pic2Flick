import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pin } from '../store/models/pin.model';

@Injectable({
  providedIn: 'root',
})
export class PinsService {
  constructor(private http: HttpClient) {}

  getPins(page: number) {
    return this.http.get<Pin[]>(
      `https://api.unsplash.com/photos/?page=${page}&per_page=20&client_id=kQ6xg4d5ZklemPe-j7h9FkngtAQOS1_0Lm2ax6O-foE`
    );
  }
}
