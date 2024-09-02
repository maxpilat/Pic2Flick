import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadPins, loadPinsSuccess, loadPinsError } from '../actions/pins.actions';
import { catchError, mergeMap, map, of } from 'rxjs';
import { PinService } from '../../services/pin.service';

export const loadPinsEffect = createEffect(
  (actions$ = inject(Actions), pinService = inject(PinService)) =>
    actions$.pipe(
      ofType(loadPins),
      mergeMap(({ page }) =>
        pinService.getPins(page).pipe(
          map((pins) => loadPinsSuccess({ pins })),
          catchError(() => of(loadPinsError()))
        )
      )
    ),
  { functional: true }
);
