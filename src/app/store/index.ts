import { ActionReducerMap } from '@ngrx/store';
import { CounterState, counterNode, counterReducer } from './reducers/counter.reducer';
import { pinsNode, pinsReducer, PinsState } from './reducers/pins.reducer';

export interface State {
  [counterNode]: CounterState;
  [pinsNode]: PinsState;
}

export const reducers: ActionReducerMap<State> = {
  [counterNode]: counterReducer,
  [pinsNode]: pinsReducer,
};
