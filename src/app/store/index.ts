import { ActionReducerMap } from '@ngrx/store';
import { CounterState, counterNode, counterReducer } from './reducers/counter.reducer';
import { pinNode, pinReducer, PinState } from './reducers/pin.reducer';

export interface State {
  [counterNode]: CounterState;
  [pinNode]: PinState;
}

export const reducers: ActionReducerMap<State> = {
  [counterNode]: counterReducer,
  [pinNode]: pinReducer,
};
