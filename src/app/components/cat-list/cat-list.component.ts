import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Cat } from '../../store/models/cat.model';
import { CommonModule } from '@angular/common';
import { CatCardComponent } from '../cat-card/cat-card.component';
import { CatsState } from '../../store/reducers/cats.reducer';
import { Store } from '@ngrx/store';
import { loadCats } from '../../store/actions/cats.actions';
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
import { selectCats, selectCatsPending } from '../../store/selectors/cats.selectors';
import { NgxMasonryModule } from 'ngx-masonry';

@Component({
  selector: 'cat-list',
  standalone: true,
  imports: [CommonModule, CatCardComponent, NgxMasonryModule],
  templateUrl: './cat-list.component.html',
  styleUrl: './cat-list.component.scss',
})
export class CatListComponent implements OnInit, OnDestroy {
  cats$: Observable<Cat[]>;
  @ViewChild('loadMore') private loadMore: ElementRef;
  private isLoading = false;
  private imagesLoadedCount = 0;
  private imagesRequestedCount = 0;
  private lastTouchY = 0;
  private imagesLoadedCount$ = new Subject<number>();
  private imagesLoadedCountSubscription: Subscription;
  isLoader = false;

  constructor(private store: Store<CatsState>) {
    this.cats$ = this.store.select(selectCats);
    this.store.select(selectCatsPending).subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
  }

  ngOnInit() {
    this.initialLoading();
    this.cats$.subscribe((cats) => {
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
          this.store.dispatch(loadCats());
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
      this.store.dispatch(loadCats());
      this.store.dispatch(loadCats());
    }
  }

  private isLoadMoreVisible() {
    const loadMoreElement = this.loadMore.nativeElement;
    const rect = loadMoreElement.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight + 500 && rect.bottom > 0;
    return isVisible;
  }
}
