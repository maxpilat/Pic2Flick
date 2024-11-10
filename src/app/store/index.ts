import { ActionReducerMap } from '@ngrx/store';
import { pinNode, pinReducer, PinState } from './reducers/pin.reducer';

export interface State {
  [pinNode]: PinState;
}

export const reducers: ActionReducerMap<State> = {
  [pinNode]: pinReducer,
};
