import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, from, Observable, of } from 'rxjs';

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
  private apiUrl = 'http://localhost:3331/api/images/describe';

  constructor() {}

  searchMovies(pinUrl: string): Observable<Movie[]> {
    // const headers = new Headers({
    //   Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJvN05RSHkycTZyMUYyUVNpaHJOZ2Y2YUlXZWhFQjVyWEUwNF8wR3VURkk0In0.eyJleHAiOjE3MzM3NTQzNjQsImlhdCI6MTczMzc1MzQ2NCwianRpIjoiMThiNWYxNTEtNWU1YS00MWVhLTljOTItNTgxMjc2YTQyNjQ5IiwiaXNzIjoiaHR0cDovL2tleWNsb2FrOjgwODAvcmVhbG1zL3AyZiIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiIyOGViMjIzMy1lYzczLTQxMTMtYmIyOS05ZjE2NGQ3MTUxOWMiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJhdXRoLXNlcnYiLCJzaWQiOiI0NTlkYTkyNC02ZjYxLTQ1NmEtOWEzMS1iZGIxZjJjMTlkZjQiLCJhY3IiOiIxIiwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtcDJmIiwiUk9MRV9VU0VSIiwib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoicHJvZmlsZSBlbWFpbCIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYW1lIjoibWF4cGlsYXQgbWF4cGlsYXQiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtYXhwaWxhdCIsImdpdmVuX25hbWUiOiJtYXhwaWxhdCIsImZhbWlseV9uYW1lIjoibWF4cGlsYXQiLCJlbWFpbCI6InBpbGF0bWRAb3V0bG9vay5jb20ifQ.Ndf9tZnPgg9Nct9fWEeBXNK-F1vmtR_WEHYSXgJkEjYnc_dhxZAuBKsUVXDzzyxz1PZ6SNvL_t0qZWxr5kqExyBjb4uwfi8D_UqYoY8hfH2NAm-37NSc0DAreYqhg9XIiy1ZME--cfQUOmanfN_zBn7qy6M5bj-Mm_Krspc7NtCq-6mnVm_yf7X0DcoWqcE7ANrVQ2HTiZ3esvhq2YH2_r8jvaaesmtqJuR6L1WbNyXCdRM-phm4oYp_wg0zhS43HCv8-z7vvceYqLnOpJOd8pEi5JCMMeP4yX6nApuXPKV7sjiEh6a6YbEKO1wLNiVm8W-pabxcEfGfH6poOcPmpw`,
    // });

    const body = {
      imageUrl: pinUrl,
      isKeyWordsMode: false,
    };

    return from(
      fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJvN05RSHkycTZyMUYyUVNpaHJOZ2Y2YUlXZWhFQjVyWEUwNF8wR3VURkk0In0.eyJleHAiOjE3MzM3NTQzNjQsImlhdCI6MTczMzc1MzQ2NCwianRpIjoiMThiNWYxNTEtNWU1YS00MWVhLTljOTItNTgxMjc2YTQyNjQ5IiwiaXNzIjoiaHR0cDovL2tleWNsb2FrOjgwODAvcmVhbG1zL3AyZiIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiIyOGViMjIzMy1lYzczLTQxMTMtYmIyOS05ZjE2NGQ3MTUxOWMiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJhdXRoLXNlcnYiLCJzaWQiOiI0NTlkYTkyNC02ZjYxLTQ1NmEtOWEzMS1iZGIxZjJjMTlkZjQiLCJhY3IiOiIxIiwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtcDJmIiwiUk9MRV9VU0VSIiwib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoicHJvZmlsZSBlbWFpbCIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYW1lIjoibWF4cGlsYXQgbWF4cGlsYXQiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtYXhwaWxhdCIsImdpdmVuX25hbWUiOiJtYXhwaWxhdCIsImZhbWlseV9uYW1lIjoibWF4cGlsYXQiLCJlbWFpbCI6InBpbGF0bWRAb3V0bG9vay5jb20ifQ.Ndf9tZnPgg9Nct9fWEeBXNK-F1vmtR_WEHYSXgJkEjYnc_dhxZAuBKsUVXDzzyxz1PZ6SNvL_t0qZWxr5kqExyBjb4uwfi8D_UqYoY8hfH2NAm-37NSc0DAreYqhg9XIiy1ZME--cfQUOmanfN_zBn7qy6M5bj-Mm_Krspc7NtCq-6mnVm_yf7X0DcoWqcE7ANrVQ2HTiZ3esvhq2YH2_r8jvaaesmtqJuR6L1WbNyXCdRM-phm4oYp_wg0zhS43HCv8-z7vvceYqLnOpJOd8pEi5JCMMeP4yX6nApuXPKV7sjiEh6a6YbEKO1wLNiVm8W-pabxcEfGfH6poOcPmpw`,
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
        return of([]); // Возвращаем пустой массив в случае ошибки
      })
    );
  }
}
