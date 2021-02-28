import { createSelector } from '@ngrx/store';
import { candidateAdapter, candidateFeatureSelector } from '../reducer/candidates.reducer';


const { selectAll } = candidateAdapter.getSelectors();

export const selectAllCandidates = createSelector(candidateFeatureSelector, selectAll);

export const selectLoadingCandidates = createSelector(candidateFeatureSelector, (state) => state.loadingCandidates);
