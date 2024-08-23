import { createFeatureSelector, createSelector } from '@ngrx/store';
import { counterNode, CounterState } from '../reducers/counter.reducer';

export const selectCounterState = createFeatureSelector<CounterState>(counterNode);

export const selectCount = createSelector(selectCounterState, (state: CounterState) => state.count);
export const selectUpdatedAt = createSelector(selectCounterState, (state: CounterState) => state.updatedAt);
