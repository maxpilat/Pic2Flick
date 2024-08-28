import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { selectCount, selectUpdatedAt } from '../../store/selectors/counter.selectors';
import { CounterState } from '../../store/reducers/counter.reducer';
import { increment, decrement, clear } from '../../store/actions/counter.actions';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'counter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.scss',
})
export class CounterComponent {
  public count$: Observable<number>;
  public updatedAt$: Observable<number>;
  public disableDecrease$: Observable<boolean>;

  constructor(private store: Store<CounterState>) {
    this.count$ = this.store.pipe(select(selectCount));
    this.updatedAt$ = this.store.pipe(select(selectUpdatedAt));
    this.disableDecrease$ = this.count$.pipe(map((count: number) => count <= 0));
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
