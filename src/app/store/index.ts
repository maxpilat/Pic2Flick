import { ActionReducerMap } from '@ngrx/store';
import { CounterState, counterNode, counterReducer } from './reducers/counter.reducer';
import { catsNode, catsReducer, CatsState } from './reducers/cats.reducer';

export interface State {
  [counterNode]: CounterState;
  [catsNode]: CatsState;
}

export const reducers: ActionReducerMap<State> = {
  [counterNode]: counterReducer,
  [catsNode]: catsReducer,
};
