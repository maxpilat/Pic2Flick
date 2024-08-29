import { createFeatureSelector, createSelector } from '@ngrx/store';
import { pinsNode, PinsState } from '../reducers/pins.reducer';
import { Pending } from '../models/pending.model';

export const selectPinsState = createFeatureSelector<PinsState>(pinsNode);

export const selectPins = createSelector(selectPinsState, (state: PinsState) => state.pins);
export const selectCatsPending = createSelector(
  selectPinsState,
  (state: PinsState) => state.pending.getPins === Pending.Active
);
