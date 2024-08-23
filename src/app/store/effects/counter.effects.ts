import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CounterActionTypes, CounterUpdatedAtAction } from '../actions/counter.actions';
import { map } from 'rxjs';

@Injectable()
export class CounterEffects {
  constructor(private actions$: Actions) {}

  updatedAt$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CounterActionTypes.increase, CounterActionTypes.decrease, CounterActionTypes.clear),
      map(() => new CounterUpdatedAtAction({ updatedAt: Date.now() }))
    );
  });
}
