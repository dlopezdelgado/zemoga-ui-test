import { Injectable } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Candidate } from 'src/app/shared/models/candidate.model';

import * as CandidatesActions from '../actions/candidates.actions';
import * as CandidateSelectors from '../selectors/candidate.selectors';

@Injectable({ providedIn: 'root' })
export class CandidatesHandler {

  getCandidates$ = this.store$.pipe(select(CandidateSelectors.selectAllCandidates));
  loadingCandidates$ = this.store$.pipe(select(CandidateSelectors.selectLoadingCandidates));

  errorList$ = this.actions$.pipe(ofType(CandidatesActions.getAllCandidatesFail), map(action => action.error));
  errorVote$ = this.actions$.pipe(ofType(CandidatesActions.voteCandidateFail), map(action => action.error));

  successList$ = this.actions$.pipe(ofType(CandidatesActions.getAllCandidatesSuccess), map(action => action.candidates));
  successVote$ = this.actions$.pipe(ofType(CandidatesActions.voteCandidateSuccess), map(action => action.candidate));


  constructor(public actions$: Actions, public store$: Store) { }


  loadCandidates(): void {
    this.store$.dispatch(CandidatesActions.getAllCandidates());
  }

  voteCandidate(candidate: Candidate): void {
    this.store$.dispatch(CandidatesActions.voteCandidate({ candidate }));
  }


}
