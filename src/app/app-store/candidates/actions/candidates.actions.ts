import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { Candidate, Vote } from 'src/app/shared/models/candidate.model';
import { ErrorModel } from 'src/app/shared/models/error.model';

export const getAllCandidates = createAction('[Candidates] Get All Candidates');
export const getAllCandidatesSuccess = createAction(
  '[Candidates] Get All Candidates Success',
  props<{ candidates: Candidate[] }>()
);
export const getAllCandidatesFail = createAction(
  '[Candidates] Get All Candidates Fail',
  props<{ error: ErrorModel }>()
);


export const voteCandidate = createAction('[Candidates] Vote Candidate', props<{ candidate: Candidate }>());
export const voteCandidateSuccess = createAction('[Candidates] Vote Candidate Success', props<{ candidate: Update<Candidate> }>());
export const voteCandidateFail = createAction('[Candidates] Vote Candidate Fail', props<{ error: ErrorModel }>());
