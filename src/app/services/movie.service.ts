import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export type Movie = {
  id: string;
  en_title: string;
  alternative_name: string;
  genres: string[];
  release_date: Date;
  description: string;
  short_description: string;
  rating: number;
  contries: string[];
  duration_sec: number;
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
  private apiUrl = 'https://api.example.com/movies';

  constructor(private http: HttpClient) {}

  // getMovies(): Observable<Movie[]> {
  //   return this.http.get<Movie[]>(this.apiUrl);
  // }

  getMovies(): Observable<Movie[]> {
    return new Observable<Movie[]>((observer) => {
      setTimeout(() => {
        observer.next([
          {
            id: '1',
            en_title: 'Inception',
            alternative_name: '',
            genres: ['Action', 'Sci-Fi', 'Thriller'],
            release_date: new Date('2010-07-16'),
            description:
              'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
            short_description: '',
            rating: 8.8,
            contries: ['USA', 'UK'],
            duration_sec: 8880,
            age_limit: 13,
            directors: ['Christopher Nolan'],
            actors: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Elliot Page'],
            is_active: true,
            facts: [],
            tags: [
              { name: 'Mind-bending', probability: 0.95 },
              { name: 'Thrilling', probability: 0.9 },
            ],
            poster_url: 'https://example.com/inception-poster.jpg',
            trailer_url: 'https://example.com/inception-trailer',
          },
          {
            id: '2',
            en_title: 'The Matrix',
            alternative_name: '',
            genres: ['Action', 'Sci-Fi'],
            release_date: new Date('1999-03-31'),
            description:
              'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
            short_description: '',
            rating: 8.7,
            contries: ['USA'],
            duration_sec: 8160,
            age_limit: 16,
            directors: ['The Wachowskis'],
            actors: ['Keanu Reeves', 'Laurence Fishburne', 'Carrie-Anne Moss'],
            is_active: true,
            facts: [],
            tags: [
              { name: 'Philosophical', probability: 0.9 },
              { name: 'Revolutionary', probability: 0.85 },
            ],
            poster_url: 'https://example.com/matrix-poster.jpg',
            trailer_url: 'https://example.com/matrix-trailer',
          },
          {
            id: '3',
            en_title: 'Interstellar',
            alternative_name: '',
            genres: ['Adventure', 'Drama', 'Sci-Fi'],
            release_date: new Date('2014-11-07'),
            description:
              'A team of explorers travel through a wormhole in space in an attempt to ensure humanity’s survival.',
            short_description: '',
            rating: 8.6,
            contries: ['USA', 'UK'],
            duration_sec: 10140,
            age_limit: 13,
            directors: ['Christopher Nolan'],
            actors: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain'],
            is_active: true,
            facts: [],
            tags: [
              { name: 'Epic', probability: 0.9 },
              { name: 'Emotional', probability: 0.85 },
            ],
            poster_url: 'https://example.com/interstellar-poster.jpg',
            trailer_url: 'https://example.com/interstellar-trailer',
          },
        ]);
        observer.complete();
      }, 1000);
    });
  }
}
