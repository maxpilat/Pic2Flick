import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie, MovieService } from '../../services/movie.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { MovieCardComponent } from '../movie-card/movie-card.component';

@Component({
  selector: 'app-movie-collection',
  standalone: true,
  imports: [CommonModule, HeaderComponent, MovieCardComponent],
  templateUrl: './movie-collection.component.html',
  styleUrls: ['./movie-collection.component.scss'],
})
export class MovieCollectionComponent implements OnInit {
  movies: Movie[] = [];
  pinUrl!: string;

  constructor(private movieService: MovieService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // this.route.queryParams.subscribe((params) => {
    //   this.pinUrl = params['pinUrl'];
    //   this.movieService.searchMovies(this.pinUrl).subscribe({
    //     next: (movies) => {
    //       this.movies = movies;
    //       console.log(movies);
    //     },
    //     error: (error) => {
    //       console.error(error);
    //     },
    //   });
    // });
  }
}
