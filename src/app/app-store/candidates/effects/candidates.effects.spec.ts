
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CandidatesService } from 'src/app/core/services/candidates/candidates.service';
import { CandidatesEffects } from './candidates.effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { ReplaySubject } from 'rxjs';

import * as CandidatesActions from '../actions/candidates.actions';
import { Candidate } from 'src/app/shared/models/candidate.model';
import { CloneDataInDeep } from 'typescript-clone-data-in-deep';
import { candidatesMock } from 'src/app/shared/utils/mocks/candidates.mock';
import { serverUrls } from 'src/app/shared/utils/constants/app-urls';
import { Update } from '@ngrx/entity';


describe('Candidates Effects', () => {

  let actions$: any;
  let effects: CandidatesEffects;
  let httpMock: HttpTestingController;
  let service: CandidatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        CandidatesEffects,
        provideMockActions(() => actions$),
        provideMockStore({
          initialState: {
            Candidates: {}
          }
        }),
        CandidatesService
      ]
    });

    effects = TestBed.inject(CandidatesEffects);
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(CandidatesService);

  });

  beforeEach(() => {
    actions$ = new ReplaySubject(1);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('#getCandidates$', () => {

    it(`Should return a success action if the service response is successful`, () => {

      // Arrange
      const candidates: Candidate[] = CloneDataInDeep.clone(candidatesMock);
      const action = CandidatesActions.getAllCandidates();
      const actionSuccess = CandidatesActions.getAllCandidatesSuccess({ candidates });
      const url = `${serverUrls.candidates}`;

      // Act
      actions$.next(action);

      effects.getAllCandidates$.subscribe((response) => {

        // Assert
        expect(response).toEqual(actionSuccess);

      });
      const request: TestRequest = httpMock.expectOne(url);
      request.flush(candidates);


    });

    it(`Should return a fail action when service response fails`, () => {

      // Arrange
      const url = `${serverUrls.candidates}`;
      const error = { message: 'Error' };

      const action = CandidatesActions.getAllCandidates();
      const actionFail = CandidatesActions.getAllCandidatesFail({ error });

      const errorInfo = new ErrorEvent('Error');

      // Act
      actions$.next(action);

      effects.getAllCandidates$.subscribe((response) => {
        // Assert
        expect(response.type).toEqual(actionFail.type);
      });
      const request: TestRequest = httpMock.expectOne(url);
      request.error(errorInfo);

    });

  });



  describe('#voteCandidate$', () => {

    it(`Should return a success action if the service response is successful`, () => {

      // Arrange
      const candidate: Candidate = CloneDataInDeep.clone(candidatesMock[0]);
      const action = CandidatesActions.updateCandidate({ candidate });
      const updateCandidate: Update<Candidate> = {
        changes: {
          ...action.candidate,
          votes: candidate.votes
        },
        id: action.candidate._id
      }
      const actionSuccess = CandidatesActions.updateCandidateSuccess({ candidate: updateCandidate });

      // Act
      actions$.next(action);

      effects.updateCandidate$.subscribe((response) => {

        // Assert
        expect(response).toEqual(actionSuccess);

      });



    });

  });

});
