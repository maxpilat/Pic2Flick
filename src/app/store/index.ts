import { ActionReducerMap } from '@ngrx/store';
import { CounterState, counterNode, counterReducer } from './reducers/counter.reducer';
import { pinsNode, pinReducer, PinState } from './reducers/pin.reducer';

export interface State {
  [counterNode]: CounterState;
  [pinsNode]: PinState;
}

export const reducers: ActionReducerMap<State> = {
  [counterNode]: counterReducer,
  [pinsNode]: pinReducer,
};
