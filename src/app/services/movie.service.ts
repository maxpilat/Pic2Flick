import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, from, Observable, of } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';

export type Movie = {
  id: string;
  enTitle: string;
  genres: string[];
  releaseDate: Date;
  description: string;
  shortDescription: string;
  rating: number;
  countries: string[];
  durationMinute: number;
  ageLimit: number;
  directors: string[];
  actors: string[];
  isActive: boolean;
  facts: string[];
  tags: {
    name: string;
    probability: number;
  }[];
  posterUrl: string;
  trailerUrl: string;
};

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private pinsUrl = 'http://localhost:3331/api/images/search-movies';
  private moviesUrl = 'http://localhost:3332/api/movies';

  constructor(private authService: AuthService) {}

  searchMovies(pinUrl: string): Observable<Movie[]> {
    const body = {
      imageUrl: pinUrl,
      isKeyWordsMode: true,
    };

    return from(
      fetch(this.pinsUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: this.authService.getAuthData()?.access_token || '',
        },
        body: JSON.stringify(body),
      }).then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
    ).pipe(
      catchError((error) => {
        console.error('Error during searchMovies:', error);
        return of([]);
      })
    );
  }

  getMovies(): Observable<Movie[]> {
    return from(
      fetch(this.moviesUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: this.authService.getAuthData()?.access_token || '',
        },
      }).then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
    ).pipe(
      catchError((error) => {
        console.error('Error during searchMovies:', error);
        return of([]);
      })
    );
  }
}
