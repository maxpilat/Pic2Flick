import { createAction, props } from '@ngrx/store';
import { Pin } from '../models/pin.model';

export enum PinsActionsTypes {
  loadPins = '[PINS] Load Pins',
  loadPinsSuccess = '[PINS] Load Pins Success',
  loadPinsError = '[PINS] Load Pins Error',
}

export const loadPins = createAction(PinsActionsTypes.loadPins);

export const loadPinsSuccess = createAction(PinsActionsTypes.loadPinsSuccess, props<{ pins: Pin[] }>());

export const loadPinsError = createAction(PinsActionsTypes.loadPinsError);
