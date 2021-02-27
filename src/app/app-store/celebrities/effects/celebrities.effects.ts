import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { CelebritiesService } from 'src/app/core/services/celebrities/celebrities.service';
import { Celebrity } from 'src/app/shared/models/celebrity.model';

import * as CelebritiesActions from '../actions/celebrities.actions';


@Injectable()
export class CelebritiesEffects {

  getAllCelebrities$ = createEffect(() => this.actions$.pipe(
    ofType(CelebritiesActions.getAllCelebrities),
    exhaustMap(() => this.service.getAll().pipe(
      map((celebrities: Celebrity[]) => CelebritiesActions.getAllCelebritiesSuccess({ celebrities })),
      catchError(error => of(CelebritiesActions.getAllCelebritiesFail({ error })))
    ))
  ));

  constructor(private actions$: Actions, public service: CelebritiesService) { }

}
