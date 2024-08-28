import { createAction, props } from '@ngrx/store';
import { Cat } from '../models/cat.model';

export enum CatsActionsTypes {
  loadCats = '[CATS] Load Cats',
  loadCatsSuccess = '[CATS] Load Cats Success',
  loadCatsError = '[CATS] Load Cats Error',
}

export const loadCats = createAction(CatsActionsTypes.loadCats);

export const loadCatsSuccess = createAction(CatsActionsTypes.loadCatsSuccess, props<{ cats: Cat[] }>());

export const loadCatsError = createAction(CatsActionsTypes.loadCatsError);
