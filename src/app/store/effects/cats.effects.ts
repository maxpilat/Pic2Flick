import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadCats, loadCatsError, loadCatsSuccess } from '../actions/cats.actions';
import { catchError, mergeMap, map, of, tap } from 'rxjs';
import { CatsService } from '../../services/cats.service';

export const loadCatsEffect = createEffect(
  (actions$ = inject(Actions), catsService = inject(CatsService)) =>
    actions$.pipe(
      ofType(loadCats),
      mergeMap(() =>
        catsService.getCats().pipe(
          map((cats) => loadCatsSuccess({ cats })),
          tap((cats) => console.log(cats)),
          catchError(() => of(loadCatsError()))
        )
      )
    ),
  { functional: true }
);
