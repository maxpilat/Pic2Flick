import { ActionReducerMap } from '@ngrx/store';
import { CounterState, counterNode, counterReducer } from './reducers/counter.reducer';
import { CounterAction } from './actions/counter.actions';

export interface State {
  [counterNode]: CounterState;
}

export const reducers: ActionReducerMap<State, CounterAction> = {
  [counterNode]: counterReducer,
};
