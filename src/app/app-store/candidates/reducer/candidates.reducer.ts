
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createFeatureSelector, createReducer, on } from '@ngrx/store';
import { Candidate } from 'src/app/shared/models/candidate.model';


import * as CandidatesActions from '../actions/candidates.actions';


export interface CandidateState extends EntityState<Candidate> {
  loadingCandidates: boolean;
  loadingVote: boolean;
}

export const candidatesFeatureKey = 'candidates';
export const candidateFeatureSelector = createFeatureSelector<CandidateState>(candidatesFeatureKey);

export const candidateAdapter: EntityAdapter<Candidate> = createEntityAdapter<Candidate>({
  selectId: (candidate: Candidate) => candidate._id,
  // sortComparer: (a: Candidate, b: Candidate) => a.name.localeCompare(b.name)
});

export const candidateInitialState: CandidateState = candidateAdapter.getInitialState({
  loadingCandidates: false,
  loadingVote: false
});


export const reducer = createReducer(
  candidateInitialState,
  on(CandidatesActions.getAllCandidates, (state) => ({ ...state, loadingCandidates: true })),
  on(CandidatesActions.getAllCandidatesSuccess, (state, { candidates }) => candidateAdapter.setAll(candidates, {
    ...state,
    loadingCandidates: false
  })),
  on(CandidatesActions.getAllCandidatesFail, (state) => ({ ...state, loadingCandidates: false })),

  on(CandidatesActions.voteCandidate, (state) => ({ ...state, loadingVote: true })),
  on(CandidatesActions.voteCandidateSuccess, (state, { candidate }) => candidateAdapter.updateOne(candidate, {
    ...state,
    loadingVote: false
  })),
  on(CandidatesActions.voteCandidateFail, (state) => ({ ...state, loadingVote: false })),

);
