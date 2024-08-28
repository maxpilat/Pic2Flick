import { createFeatureSelector, createSelector } from '@ngrx/store';
import { catsNode, CatsState } from '../reducers/cats.reducer';
import { Pending } from '../models/pending.model';

export const selectCatsState = createFeatureSelector<CatsState>(catsNode);

export const selectCats = createSelector(selectCatsState, (state: CatsState) => state.cats);
export const selectCatsPending = createSelector(
  selectCatsState,
  (state: CatsState) => state.pending.getCats === Pending.Active
);
