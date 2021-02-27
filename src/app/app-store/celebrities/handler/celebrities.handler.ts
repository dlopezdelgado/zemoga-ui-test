import { Injectable } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import * as CelebritiesActions from '../actions/celebrities.actions';
import * as CelebritySelectors from '../selectors/celebrity.selectors';

@Injectable({ providedIn: 'root' })
export class CelebritiesHandler {

  getCelebrities$ = this.store$.pipe(select(CelebritySelectors.selectAllCelebrities));
  loadingCelebrities$ = this.store$.pipe(select(CelebritySelectors.selectLoadingCelebrities));

  errorList$ = this.actions$.pipe(ofType(CelebritiesActions.getAllCelebritiesFail), map(action => action.error));

  successList$ = this.actions$.pipe(ofType(CelebritiesActions.getAllCelebritiesSuccess), map(action => action.celebrities));


  constructor(public actions$: Actions, public store$: Store) { }


  loadCelebrities() {
    this.store$.dispatch(CelebritiesActions.getAllCelebrities());
  }


}
