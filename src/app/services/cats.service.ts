import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cat } from '../store/models/cat.model';

@Injectable({
  providedIn: 'root',
})
export class CatsService {
  constructor(private http: HttpClient) {}

  getCats() {
    return this.http.get<Cat[]>('https://api.thecatapi.com/v1/images/search?limit=10');
  }
}
