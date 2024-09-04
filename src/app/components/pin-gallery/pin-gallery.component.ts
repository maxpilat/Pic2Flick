import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Pin } from '../../store/models/pin.model';
import { CommonModule } from '@angular/common';
import { PinComponent } from '../pin/pin.component';
import { PinState } from '../../store/reducers/pin.reducer';
import { Store } from '@ngrx/store';
import { loadPins } from '../../store/actions/pins.actions';
import { debounceTime, filter, interval, Observable, Subject, switchMap, take, takeWhile, tap } from 'rxjs';
import { selectPins, selectPinsPending } from '../../store/selectors/pin.selectors';
import { NgxMasonryModule } from 'ngx-masonry';

@Component({
  selector: 'pin-gallery',
  standalone: true,
  imports: [CommonModule, PinComponent, NgxMasonryModule],
  templateUrl: './pin-gallery.component.html',
  styleUrl: './pin-gallery.component.scss',
})
export class PinGalleryComponent implements OnInit {
  pins$: Observable<Pin[]>;
  @ViewChild('loadMore') private loadMore: ElementRef;
  private currentPage = 0;
  private isLoading = false;
  private pinsLoadedCount = 0;
  private pinsRequestedCount = 0;
  private pinsLoadedCount$ = new Subject<number>();
  private lastTouchY = 0;
  isLoader = true;

  constructor(private store: Store<PinState>) {
    this.pins$ = this.store.select(selectPins);
    this.store.select(selectPinsPending).subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
  }

  ngOnInit() {
    this.initialLoading();
    this.pins$.subscribe((pins) => {
      this.pinsRequestedCount = pins.length;
    });

    this.pinsLoadedCount$
      .pipe(
        tap(() => (this.isLoader = false)),
        debounceTime(1000)
      )
      .subscribe(() => (this.isLoader = true));
  }

  private initialLoading() {
    interval(500)
      .pipe(
        takeWhile(() => this.isLoadMoreVisible()),
        take(10),
        filter(() => !this.isLoading && this.pinsLoadedCount === this.pinsRequestedCount),
        switchMap(() => {
          this.store.dispatch(loadPins({ page: ++this.currentPage }));
          return this.store.select(selectPinsPending).pipe(take(1));
        })
      )
      .subscribe();
  }

  onImageLoaded() {
    this.pinsLoadedCount$.next(++this.pinsLoadedCount);
  }

  @HostListener('wheel', ['$event'])
  onWheel(event: WheelEvent) {
    if (event.deltaY > 0) {
      this.handleScroll();
    }
  }

  @HostListener('touchmove', ['$event'])
  onTouchMove(event: TouchEvent) {
    const touch = event.touches[0];
    if (touch.clientY > this.lastTouchY) {
      this.handleScroll();
    }
    this.lastTouchY = touch.clientY;
  }

  private handleScroll() {
    if (this.isLoadMoreVisible() && !this.isLoading && this.pinsLoadedCount === this.pinsRequestedCount) {
      this.store.dispatch(loadPins({ page: ++this.currentPage }));
    }
  }

  private isLoadMoreVisible() {
    const loadMoreElement = this.loadMore.nativeElement;
    const rect = loadMoreElement.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight + 500 && rect.bottom > 0;
    return isVisible;
  }
}
