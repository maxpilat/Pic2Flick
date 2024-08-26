import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { increment, decrement, clear, updatedAt } from '../actions/counter.actions';
import { map } from 'rxjs';
import { LoggingService } from '../../services/logging.service';

export const updatedAtEffect = createEffect(
  (actions$ = inject(Actions), loggingService = inject(LoggingService)) =>
    actions$.pipe(
      ofType(increment, decrement, clear),
      map((action) => {
        loggingService.logAction(action.type);
        return updatedAt({ updatedAt: Date.now() });
      })
    ),
  { functional: true }
);

// @Injectable()
// export class CounterEffects {
//   constructor(private actions$: Actions, private loggingService: LoggingService) {}

//   updatedAt$ = createEffect(() => {
//     return this.actions$.pipe(
//       ofType(increment, decrement, clear),
//       map((action) => {
//         this.loggingService.logAction(action.type);
//         return updatedAt({ updatedAt: Date.now() });
//       })
//     );
//   });
// }
