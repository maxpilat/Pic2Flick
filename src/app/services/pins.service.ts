import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pin } from '../store/models/pin.model';

@Injectable({
  providedIn: 'root',
})
export class PinsService {
  constructor(private http: HttpClient) {}

  getPins() {
    return this.http.get<Pin[]>('https://api.thecatapi.com/v1/images/search?limit=10');
  }
}
