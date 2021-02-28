import { Injectable } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Celebrity } from 'src/app/shared/models/celebrity.model';

import * as CelebritiesActions from '../actions/celebrities.actions';
import * as CelebritySelectors from '../selectors/celebrity.selectors';

@Injectable({ providedIn: 'root' })
export class CelebritiesHandler {

  getCelebrities$ = this.store$.pipe(select(CelebritySelectors.selectAllCelebrities));
  loadingCelebrities$ = this.store$.pipe(select(CelebritySelectors.selectLoadingCelebrities));

  errorList$ = this.actions$.pipe(ofType(CelebritiesActions.getAllCelebritiesFail), map(action => action.error));
  errorVote$ = this.actions$.pipe(ofType(CelebritiesActions.voteCelebrityFail), map(action => action.error));

  successList$ = this.actions$.pipe(ofType(CelebritiesActions.getAllCelebritiesSuccess), map(action => action.celebrities));
  successVote$ = this.actions$.pipe(ofType(CelebritiesActions.voteCelebritySuccess), map(action => action.celebrity));


  constructor(public actions$: Actions, public store$: Store) { }


  loadCelebrities() {
    this.store$.dispatch(CelebritiesActions.getAllCelebrities());
  }

  voteCelebrity(celebrity: Celebrity) {
    this.store$.dispatch(CelebritiesActions.voteCelebrity({ celebrity }));
  }


}
