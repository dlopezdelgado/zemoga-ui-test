
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createFeatureSelector, createReducer, on } from '@ngrx/store';
import { Candidate } from 'src/app/shared/models/candidate.model';


import * as CandidatesActions from '../actions/candidates.actions';


export interface CandidateState extends EntityState<Candidate> {
  loadingCandidates: boolean;
  loadingUpdate: boolean;
}

export const candidatesFeatureKey = 'candidates';
export const candidateFeatureSelector = createFeatureSelector<CandidateState>(candidatesFeatureKey);

export const candidateAdapter: EntityAdapter<Candidate> = createEntityAdapter<Candidate>({
  selectId: (candidate: Candidate) => candidate._id,
  // sortComparer: (a: Candidate, b: Candidate) => a.name.localeCompare(b.name)
});

export const candidateInitialState: CandidateState = candidateAdapter.getInitialState({
  loadingCandidates: false,
  loadingUpdate: false
});


export const reducer = createReducer(
  candidateInitialState,
  on(CandidatesActions.getAllCandidates, (state) => ({ ...state, loadingCandidates: true })),
  on(CandidatesActions.getAllCandidatesSuccess, (state, { candidates }) => candidateAdapter.setAll(candidates, {
    ...state,
    loadingCandidates: false
  })),
  on(CandidatesActions.getAllCandidatesFail, (state) => ({ ...state, loadingCandidates: false })),

  on(CandidatesActions.updateCandidate, (state) => ({ ...state, loadingUpdate: true })),
  on(CandidatesActions.updateCandidateSuccess, (state, { candidate }) => candidateAdapter.updateOne(candidate, {
    ...state,
    loadingUpdate: false
  })),
  on(CandidatesActions.updateCandidateFail, (state) => ({ ...state, loadingUpdate: false })),

);
