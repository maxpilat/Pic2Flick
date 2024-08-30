import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadPins, loadPinsSuccess, loadPinsError } from '../actions/pins.actions';
import { catchError, mergeMap, map, of } from 'rxjs';
import { PinsService } from '../../services/pins.service';

export const loadPinsEffect = createEffect(
  (actions$ = inject(Actions), pinsService = inject(PinsService)) =>
    actions$.pipe(
      ofType(loadPins),
      mergeMap(() =>
        pinsService.getPins().pipe(
          map((pins) => loadPinsSuccess({ pins })),
          catchError(() => of(loadPinsError()))
        )
      )
    ),
  { functional: true }
);
