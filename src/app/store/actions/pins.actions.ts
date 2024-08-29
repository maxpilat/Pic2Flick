import { createAction, props } from '@ngrx/store';
import { Pin } from '../models/pin.model';

export enum PinsActionsTypes {
  loadCats = '[PINS] Load Pins',
  loadCatsSuccess = '[PINS] Load Pins Success',
  loadCatsError = '[PINS] Load Pins Error',
}

export const loadPins = createAction(PinsActionsTypes.loadCats);

export const loadPinsSuccess = createAction(PinsActionsTypes.loadCatsSuccess, props<{ pins: Pin[] }>());

export const loadPinsError = createAction(PinsActionsTypes.loadCatsError);
