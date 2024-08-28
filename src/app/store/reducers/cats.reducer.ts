import { createReducer, on } from '@ngrx/store';
import { Cat } from '../models/cat.model';
import { loadCats, loadCatsError, loadCatsSuccess } from '../actions/cats.actions';
import { Pending } from '../models/pending.model';

export const catsNode = 'cats';

export type CatsState = {
  cats: Cat[];
  pending: {
    getCats: Pending;
  };
};

const initialState: CatsState = {
  cats: [],
  pending: {
    getCats: Pending.None,
  },
};

export const catsReducer = createReducer(
  initialState,
  on(loadCats, (state) => ({
    ...state,
    pending: {
      ...state.pending,
      getCats: state.pending.getCats === Pending.Error ? Pending.ErrorPending : Pending.Active,
    },
  })),
  on(loadCatsSuccess, (state, { cats }) => ({
    ...state,
    cats: [...state.cats, ...cats],
    pending: { ...state.pending, getCats: Pending.None },
  })),
  on(loadCatsError, (state) => ({
    ...state,
    pending: { ...state.pending, getCats: Pending.Error },
  }))
);
