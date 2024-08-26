import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { increment, decrement, clear, updatedAt } from '../actions/counter.actions';
import { map } from 'rxjs';
import { Action } from '@ngrx/store';

export const updatedAtEffect = createEffect(
  () => {
    const actions$ = inject(Actions);

    return actions$.pipe(
      ofType(increment, decrement, clear),
      map((): Action => updatedAt({ updatedAt: Date.now() }))
    );
  },
  { functional: true }
);

// @Injectable()
// export class CounterEffects {
//   constructor(private actions$: Actions) {}

//   updatedAt$ = createEffect(() => {
//     return this.actions$.pipe(
//       ofType(increment, decrement, clear),
//       map(() => updatedAt({ updatedAt: Date.now() }))
//     );
//   });
// }
