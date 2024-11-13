import { Component, OnInit } from '@angular/core';
import { Movie, MovieService } from '../../services/movie.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-collection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-collection.component.html',
  styleUrl: './movie-collection.component.scss',
})
export class MovieCollectionComponent implements OnInit {
  movies: Movie[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService.getMovies().subscribe({
      next: (movies) => {
        this.movies = movies;
      },
      error: (error) => {
        console.error('Error fetching movies:', error);
      },
    });
  }
}
