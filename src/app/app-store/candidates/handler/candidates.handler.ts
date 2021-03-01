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
  errorUpdate$ = this.actions$.pipe(ofType(CandidatesActions.updateCandidateFail), map(action => action.error));

  successList$ = this.actions$.pipe(ofType(CandidatesActions.getAllCandidatesSuccess), map(action => action.candidates));
  successUpdate$ = this.actions$.pipe(ofType(CandidatesActions.updateCandidateSuccess), map(action => action.candidate));


  constructor(public actions$: Actions, public store$: Store) { }


  loadCandidates(): void {
    this.store$.dispatch(CandidatesActions.getAllCandidates());
  }

  updateCandidate(candidate: Candidate): void {
    this.store$.dispatch(CandidatesActions.updateCandidate({ candidate }));
  }


}
