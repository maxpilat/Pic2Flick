import { createFeatureSelector, createSelector } from '@ngrx/store';
import { pinsNode, PinState } from '../reducers/pin.reducer';
import { Pending } from '../models/pending.model';

export const selectPinState = createFeatureSelector<PinState>(pinsNode);

export const selectPins = createSelector(selectPinState, (state: PinState) => state.pins);
export const selectPinsPending = createSelector(
  selectPinState,
  (state: PinState) => state.pending.getPins === Pending.Active
);
