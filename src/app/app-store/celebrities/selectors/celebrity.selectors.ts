import { createSelector } from '@ngrx/store';
import { celebrityAdapter, celebrityFeatureSelector } from '../reducer/celebrities.reducer';


const { selectAll } = celebrityAdapter.getSelectors();

export const selectAllCelebrities = createSelector(celebrityFeatureSelector, selectAll);

export const selectLoadingCelebrities = createSelector(celebrityFeatureSelector, (state) => state.loadingCelebrities);
