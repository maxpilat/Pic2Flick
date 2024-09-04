import { createFeatureSelector, createSelector } from '@ngrx/store';
import { pinNode, PinState } from '../reducers/pin.reducer';

export const selectPinState = createFeatureSelector<PinState>(pinNode);

export const selectPins = createSelector(selectPinState, (state: PinState) => state.pins);
export const selectPinsPending = createSelector(selectPinState, (state: PinState) => state.pending.getPins);
