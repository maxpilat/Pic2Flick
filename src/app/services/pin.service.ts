import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pin } from '../store/models/pin.model';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class PinService {
  constructor(private http: HttpClient) {}

  getPins(page: number, perPage = 20) {
    return this.http.get<Pin[]>(`${environment.remoteUrl}/photos/?page=${page}&per_page=${perPage}`);
  }
}
