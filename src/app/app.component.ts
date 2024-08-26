import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { selectCount, selectUpdatedAt } from './store/selectors/counter.selectors';
import { CommonModule } from '@angular/common';
import { increment, decrement, clear } from './store/actions/counter.actions';
import { CounterState } from './store/reducers/counter.reducer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  public count$: Observable<number>;
  public updatedAt$: Observable<number>;
  public disableDecrease$: Observable<boolean>;

  constructor(private store: Store<CounterState>) {
    this.count$ = this.store.pipe(select(selectCount));
    this.updatedAt$ = this.store.pipe(select(selectUpdatedAt));
    this.disableDecrease$ = this.count$.pipe(map((count) => count <= 0));
  }

  increase() {
    this.store.dispatch(increment());
  }

  decrease() {
    this.store.dispatch(decrement());
  }

  clear() {
    this.store.dispatch(clear());
  }
}
