import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { CandidatesService } from 'src/app/core/services/candidates/candidates.service';
import { Candidate } from 'src/app/shared/models/candidate.model';

import * as CandidatesActions from '../actions/candidates.actions';


@Injectable()
export class CandidatesEffects {

  getAllCandidates$ = createEffect(() => this.actions$.pipe(
    ofType(CandidatesActions.getAllCandidates),
    exhaustMap(() => this.service.getAll().pipe(
      map((candidates: Candidate[]) => CandidatesActions.getAllCandidatesSuccess({ candidates })),
      catchError(error => of(CandidatesActions.getAllCandidatesFail({ error })))
    ))
  ));

  updateCandidate$ = createEffect(() => this.actions$.pipe(
    ofType(CandidatesActions.updateCandidate),
    exhaustMap(action => this.service.updateCandidate(action.candidate).pipe(
      map(candidateData => CandidatesActions.updateCandidateSuccess({
        candidate: {
          changes: {
            ...action.candidate,
            votes: candidateData.votes
          },
          id: action.candidate._id
        }
      })),
      catchError(error => of(CandidatesActions.updateCandidateFail({ error })))
    ))
  ));

  constructor(private actions$: Actions, public service: CandidatesService) { }

}
