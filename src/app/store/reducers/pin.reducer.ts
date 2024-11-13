import { createReducer, on } from '@ngrx/store';
import { loadPins, loadPinsError, loadPinsSuccess } from '../actions/pins.actions';
import { Pin } from '../../services/pin.service';

export const pinNode = 'pins';

export type PinState = {
  pins: Pin[];
  pending: {
    getPins: boolean;
  };
};

const initialState: PinState = {
  pins: [],
  pending: {
    getPins: false,
  },
};

export const pinReducer = createReducer(
  initialState,
  on(loadPins, (state) => ({
    ...state,
    pending: {
      ...state.pending,
      getPins: state.pending.getPins ? false : true,
    },
  })),
  on(loadPinsSuccess, (state, { pins }) => ({
    ...state,
    pins: [...state.pins, ...pins],
    pending: { ...state.pending, getPins: false },
  })),
  on(loadPinsError, (state) => ({
    ...state,
    pending: { ...state.pending, getPins: false },
  }))
);
