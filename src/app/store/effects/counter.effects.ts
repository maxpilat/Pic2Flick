import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { increment, decrement, clear, updatedAt } from '../actions/counter.actions';
import { map } from 'rxjs';

@Injectable()
export class CounterEffects {
  constructor(private actions$: Actions) {}

  updatedAt$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(increment, decrement, clear),
      map(() => updatedAt({ updatedAt: Date.now() }))
    );
  });
}
