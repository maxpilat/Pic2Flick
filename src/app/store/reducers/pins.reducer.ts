import { createReducer, on } from '@ngrx/store';
import { Pin } from '../models/pin.model';
import { loadPins, loadPinsError, loadPinsSuccess } from '../actions/pins.actions';
import { Pending } from '../models/pending.model';

export const pinsNode = 'pins';

export type PinsState = {
  pins: Pin[];
  pending: {
    getPins: Pending;
  };
};

const initialState: PinsState = {
  pins: [],
  pending: {
    getPins: Pending.None,
  },
};

export const pinsReducer = createReducer(
  initialState,
  on(loadPins, (state) => ({
    ...state,
    pending: {
      ...state.pending,
      getPins: state.pending.getPins === Pending.Error ? Pending.ErrorPending : Pending.Active,
    },
  })),
  on(loadPinsSuccess, (state, { pins }) => ({
    ...state,
    pins: [...state.pins, ...pins],
    pending: { ...state.pending, getPins: Pending.None },
  })),
  on(loadPinsError, (state) => ({
    ...state,
    pending: { ...state.pending, getPins: Pending.Error },
  }))
);
