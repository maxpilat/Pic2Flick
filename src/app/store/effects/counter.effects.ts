import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { increment, decrement, clear, updatedAt } from '../actions/counter.actions';
import { map } from 'rxjs';
import { Logger } from '../../services/logger.service';

export const updatedAtEffect = createEffect(
  (actions$ = inject(Actions), logger = inject(Logger)) =>
    actions$.pipe(
      ofType(increment, decrement, clear),
      map((action) => {
        logger.logAction(action.type);
        return updatedAt({ updatedAt: Date.now() });
      })
    ),
  { functional: true }
);
