import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export type Movie = {
  id: string;
  en_title: string;
  genres: string[];
  release_date: Date;
  description: string;
  short_description: string;
  rating: number;
  countries: string[];
  duration_minute: number;
  age_limit: number;
  directors: string[];
  actors: string[];
  is_active: boolean;
  facts: string[];
  tags: {
    name: string;
    probability: number;
  }[];
  poster_url: string;
  trailer_url: string;
};

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private apiUrl = 'http://localhost:3331/api/images/describe';

  constructor(private http: HttpClient) {}

  getMovies(pinUrl: string): Observable<Movie[]> {
    return this.http.post<Movie[]>(this.apiUrl, { imageUrl: pinUrl });
  }
}
