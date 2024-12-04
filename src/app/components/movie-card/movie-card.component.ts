import { Component, Input } from '@angular/core';
import { Movie } from '../../services/movie.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss'
})
export class MovieCardComponent {
  @Input() movie!: Movie;
}
