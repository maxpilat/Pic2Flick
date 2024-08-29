import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Cat } from '../../store/models/cat.model';
import { CommonModule } from '@angular/common';
import { CatCardComponent } from '../cat-card/cat-card.component';
import { CatsState } from '../../store/reducers/cats.reducer';
import { Store } from '@ngrx/store';
import { loadCats } from '../../store/actions/cats.actions';
import { filter, interval, Observable, switchMap, take, takeWhile } from 'rxjs';
import { selectCats, selectCatsPending } from '../../store/selectors/cats.selectors';
import { NgxMasonryModule } from 'ngx-masonry';

@Component({
  selector: 'cat-list',
  standalone: true,
  imports: [CommonModule, CatCardComponent, NgxMasonryModule],
  templateUrl: './cat-list.component.html',
  styleUrl: './cat-list.component.scss',
})
export class CatListComponent implements OnInit {
  cats$: Observable<Cat[]>;

  @ViewChild('loadMore') private loadMore!: ElementRef;
  private isLoading = false;
  private imagesLoadedCount = 0;
  private totalCats = 0;

  constructor(private store: Store<CatsState>) {
    this.cats$ = this.store.select(selectCats);
    this.store.select(selectCatsPending).subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
  }

  ngOnInit() {
    this.initialLoading();
    this.cats$.subscribe((cats) => {
      this.totalCats = cats.length;
    });
  }

  private initialLoading() {
    interval(500)
      .pipe(
        takeWhile(() => this.isLoadMoreVisible()),
        filter(() => !this.isLoading && this.imagesLoadedCount === this.totalCats),
        switchMap(() => {
          this.store.dispatch(loadCats());
          return this.store.select(selectCatsPending).pipe(take(1));
        })
      )
      .subscribe();
  }

  onImageLoaded() {
    this.imagesLoadedCount++;
  }

  @HostListener('window:scroll')
  onScroll() {
    if (this.isLoadMoreVisible() && !this.isLoading && this.imagesLoadedCount === this.totalCats) {
      this.store.dispatch(loadCats());
    }
  }

  private isLoadMoreVisible() {
    const loadMoreElement = this.loadMore.nativeElement;
    const rect = loadMoreElement.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight + 300 && rect.bottom > 0;
    return isVisible;
  }
}
