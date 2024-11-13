import { createAction, props } from '@ngrx/store';
import { Pin } from '../../services/pin.service';

export enum PinsActionsTypes {
  loadPins = '[PINS] Load Pins',
  loadPinsSuccess = '[PINS] Load Pins Success',
  loadPinsError = '[PINS] Load Pins Error',
}

export const loadPins = createAction(PinsActionsTypes.loadPins, props<{ page: number }>());

export const loadPinsSuccess = createAction(PinsActionsTypes.loadPinsSuccess, props<{ pins: Pin[] }>());

export const loadPinsError = createAction(PinsActionsTypes.loadPinsError);
