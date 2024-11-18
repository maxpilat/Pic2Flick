import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie, MovieService } from '../../services/movie.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-collection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-collection.component.html',
  styleUrls: ['./movie-collection.component.scss'],
})
export class MovieCollectionComponent implements OnInit {
  movies: Movie[] = [];

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute  
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const pinUrl = params['pinUrl']; // Получаем значение pinUrl из query параметров

      if (pinUrl) {
        this.movieService.getMovies(pinUrl).subscribe({
          next: (movies) => {
            this.movies = movies;
            console.log(movies)
          },
          error: (error) => {
            console.error('Error fetching movies:', error);
          },
        });
      } else {
        console.warn('pinUrl parameter is missing in query params');
      }
    });
  }
}
