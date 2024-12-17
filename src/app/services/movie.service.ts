import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, from, Observable, of } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';

// const movies: Movie[] = [
//   {
//     id: '1',
//     en_title: 'Inception',
//     genres: ['Action', 'Sci-Fi'],
//     release_date: new Date('2010-07-16'),
//     description: 'A thief who steals corporate secrets through the use of dream-sharing technology.',
//     short_description: 'A mind-bending thriller.',
//     rating: 8.8,
//     countries: ['USA'],
//     duration_minute: 148,
//     age_limit: 13,
//     directors: ['Christopher Nolan'],
//     actors: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt'],
//     is_active: true,
//     facts: ['Won 4 Oscars', 'Nominated for 8 Oscars'],
//     tags: [
//       { name: 'thriller', probability: 0.9 },
//       { name: 'sci-fi', probability: 0.85 },
//     ],
//     poster_url: 'https://image.openmoviedb.com/kinopoisk-images/1629390/8ab9a119-dd74-44f0-baec-0629797483d7/orig',
//     trailer_url: 'https://example.com/inception_trailer.mp4',
//   },
//   {
//     id: '2',
//     en_title: 'Back To The Future',
//     genres: ['Action', 'Sci-Fi'],
//     release_date: new Date('1999-03-31'),
//     description: 'A computer hacker learns about the true nature of his reality.',
//     short_description: 'A revolutionary sci-fi film.',
//     rating: 8.7,
//     countries: ['USA'],
//     duration_minute: 136,
//     age_limit: 13,
//     directors: ['Lana Wachowski', 'Lilly Wachowski'],
//     actors: ['Keanu Reeves', 'Laurence Fishburne'],
//     is_active: true,
//     facts: ['Won 4 Oscars', 'Cultural phenomenon'],
//     tags: [
//       { name: 'action', probability: 0.9 },
//       { name: 'sci-fi', probability: 0.9 },
//     ],
//     poster_url: 'https://image.openmoviedb.com/kinopoisk-images/1600647/a6b78836-c21e-48ee-89f3-714feb794b9b/orig',
//     trailer_url: 'https://example.com/matrix_trailer.mp4',
//   },
//   {
//     id: '3',
//     en_title: 'The Wolf of Wall Street',
//     genres: ['Adventure', 'Drama', 'Sci-Fi'],
//     release_date: new Date('2014-11-07'),
//     description: 'A team of explorers travel through a wormhole in space.',
//     short_description: 'A visually stunning journey.',
//     rating: 8.6,
//     countries: ['USA'],
//     duration_minute: 169,
//     age_limit: 13,
//     directors: ['Christopher Nolan'],
//     actors: ['Matthew McConaughey', 'Anne Hathaway'],
//     is_active: true,
//     facts: ['Nominated for 5 Oscars', 'Highly praised for visuals'],
//     tags: [
//       { name: 'adventure', probability: 0.85 },
//       { name: 'drama', probability: 0.8 },
//     ],
//     poster_url: 'https://image.openmoviedb.com/kinopoisk-images/1946459/5c758ac0-7a5c-4f00-a94f-1be680a312fb/orig',
//     trailer_url: 'https://example.com/interstellar_trailer.mp4',
//   },
// ];

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
  private apiUrl = 'http://localhost:3331/api/images/search-movies';
  private moviesUrl = 'http://localhost:3332/api/movies';

  constructor(private authService: AuthService) {}

  searchMovies(pinUrl: string): Observable<Movie[]> {
    const body = {
      imageUrl: pinUrl,
      isKeyWordsMode: true,
    };

    return from(
      fetch(this.apiUrl, {
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
