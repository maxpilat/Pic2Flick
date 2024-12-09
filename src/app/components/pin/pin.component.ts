import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Pin, PinService } from '../../services/pin.service';
import { CommonModule } from '@angular/common';
import { Movie, MovieService } from '../../services/movie.service';
import { MovieCardComponent } from '../movie-card/movie-card.component';

@Component({
  selector: 'pin',
  standalone: true,
  imports: [CommonModule, MovieCardComponent],
  templateUrl: './pin.component.html',
  styleUrl: './pin.component.scss',
})
export class PinComponent implements AfterViewInit {
  @Input() pin!: Pin;
  @Output() private imageLoaded = new EventEmitter<void>();
  @ViewChild('pinElem') private pinRef!: ElementRef;

  isFullscreen: boolean = false;
  isOverlayActive: boolean = false;
  isOverlayLoader: boolean = false;
  isMoviesVisible: boolean = false;

  movies: Movie[] = [];

  private scrollbarWidth!: number;
  currentIndex: number = 0;


  constructor(private router: Router, private pinService: PinService, private movieService: MovieService) {}

  ngAfterViewInit() {
    this.calcPinWidth();
    this.scrollbarWidth = this.getScrollbarWidth();
  }

  private calcPinWidth() {
    const minWidth = 200;
    const maxWidth = 300;
    const margin = 22;

    let numPins = Math.floor(window.innerWidth / (minWidth + margin));
    let pinWidth = window.innerWidth / numPins - margin;
    if (pinWidth > maxWidth) {
      pinWidth = window.innerWidth / ++numPins - margin;
    }

    this.pinRef.nativeElement.style.width = `${pinWidth}px`;
  }

  onImageLoad() {
    this.imageLoaded.emit();
  }

  handleClick() {
    if (!this.isFullscreen && !this.pinService.getActivePin()) {
      this.isFullscreen = true;
      setTimeout(() => {
        this.isOverlayActive = true;
      }, 1000);
      setTimeout(() => {
        this.isOverlayLoader = true;

        this.movieService.getMovies(this.pin.urls.raw).subscribe({
          next: (movies) => {
            this.movies = movies;
            this.isMoviesVisible = true; // Устанавливаем флаг видимости
            console.log(movies);
          },
          error: (error) => {
            console.error(error);
          },
          complete: () => {
            this.isOverlayLoader = false;
          }
        });

      }, 2000);
      this.pinService.setActivePin(this.pin);
      document.body.style.paddingRight = `${this.scrollbarWidth}px`;
      document.body.classList.add('no-scroll');
    }
  }

  closeFullscreen(event: MouseEvent) {
    event.stopPropagation();
    this.movies = [];
    this.isFullscreen = false;
    this.isOverlayActive = false;
    this.isOverlayLoader = false;

    setTimeout(() => {
      this.pinService.setActivePin(null);  
    }, 1000);

    document.body.style.paddingRight = '';
    document.body.classList.remove('no-scroll');
  }

  private getScrollbarWidth(): number {
    const outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.overflow = 'scroll';
    outer.style.width = '100px';
    outer.style.height = '100px';
    document.body.appendChild(outer);
  
    const inner = document.createElement('div');
    inner.style.width = '100%';
    inner.style.height = '100%';
    outer.appendChild(inner);
  
    const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
    outer.parentNode?.removeChild(outer);
    return scrollbarWidth;
  }

  get currentMovie() {
    return this.movies[this.currentIndex];
  }

  nextMovie() {
    this.currentIndex = (this.currentIndex + 1) % this.movies.length;
  }

  prevMovie() {
    this.currentIndex = (this.currentIndex - 1 + this.movies.length) % this.movies.length;
  }
}
