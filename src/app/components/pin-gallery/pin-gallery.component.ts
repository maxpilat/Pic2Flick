import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Pin } from '../../store/models/pin.model';
import { CommonModule } from '@angular/common';
import { PinComponent } from '../pin/pin.component';
import { PinsState } from '../../store/reducers/pins.reducer';
import { Store } from '@ngrx/store';
import { loadPins } from '../../store/actions/pins.actions';
import {
  debounceTime,
  filter,
  interval,
  Observable,
  Subject,
  Subscription,
  switchMap,
  take,
  takeWhile,
  tap,
} from 'rxjs';
import { selectPins, selectCatsPending } from '../../store/selectors/pins.selectors';
import { NgxMasonryModule } from 'ngx-masonry';

@Component({
  selector: 'pin-gallery',
  standalone: true,
  imports: [CommonModule, PinComponent, NgxMasonryModule],
  templateUrl: './pin-gallery.component.html',
  styleUrl: './pin-gallery.component.scss',
})
export class PinGalleryComponent implements OnInit, OnDestroy {
  pins$: Observable<Pin[]>;
  @ViewChild('loadMore') private loadMore: ElementRef;
  private isLoading = false;
  private imagesLoadedCount = 0;
  private imagesRequestedCount = 0;
  private lastTouchY = 0;
  private imagesLoadedCount$ = new Subject<number>();
  private imagesLoadedCountSubscription: Subscription;
  isLoader = false;

  constructor(private store: Store<PinsState>) {
    this.pins$ = this.store.select(selectPins);
    this.store.select(selectCatsPending).subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
  }

  ngOnInit() {
    this.initialLoading();
    this.pins$.subscribe((cats) => {
      this.imagesRequestedCount = cats.length;
    });

    this.imagesLoadedCount$
      .pipe(
        tap(() => (this.isLoader = false)),
        debounceTime(1000)
      )
      .subscribe(() => (this.isLoader = true));
  }

  ngOnDestroy() {
    this.imagesLoadedCountSubscription.unsubscribe();
  }

  private initialLoading() {
    interval(500)
      .pipe(
        takeWhile(() => this.isLoadMoreVisible()),
        filter(() => !this.isLoading && this.imagesLoadedCount === this.imagesRequestedCount),
        switchMap(() => {
          this.store.dispatch(loadPins());
          return this.store.select(selectCatsPending).pipe(take(1));
        })
      )
      .subscribe();
  }

  onImageLoaded() {
    this.imagesLoadedCount$.next(++this.imagesLoadedCount);
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
    if (this.isLoadMoreVisible() && !this.isLoading && this.imagesLoadedCount === this.imagesRequestedCount) {
      this.store.dispatch(loadPins());
      this.store.dispatch(loadPins());
    }
  }

  private isLoadMoreVisible() {
    const loadMoreElement = this.loadMore.nativeElement;
    const rect = loadMoreElement.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight + 500 && rect.bottom > 0;
    return isVisible;
  }
}
