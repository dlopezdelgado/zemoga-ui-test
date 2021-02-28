
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CelebritiesService } from 'src/app/core/services/celebrities/celebrities.service';
import { CelebritiesEffects } from './celebrities.effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { ReplaySubject } from 'rxjs';

import * as CelebritiesActions from '../actions/celebrities.actions';
import { Celebrity } from 'src/app/shared/models/celebrity.model';
import { CloneDataInDeep } from 'typescript-clone-data-in-deep';
import { celebritiesMock } from 'src/app/shared/utils/mocks/celebrities.mock';
import { serverUrls } from 'src/app/shared/utils/constants/app-urls';
import { Update } from '@ngrx/entity';


describe('Celebrities Effects', () => {

  let actions$: any;
  let effects: CelebritiesEffects;
  let httpMock: HttpTestingController;
  let service: CelebritiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        CelebritiesEffects,
        provideMockActions(() => actions$),
        provideMockStore({
          initialState: {
            Celebrities: {}
          }
        }),
        CelebritiesService
      ]
    });

    effects = TestBed.inject(CelebritiesEffects);
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(CelebritiesService);

  });

  beforeEach(() => {
    actions$ = new ReplaySubject(1);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('#getCelebrities$', () => {

    it(`Should return a success action if the service response is successful`, () => {

      // Arrange
      const celebrities: Celebrity[] = CloneDataInDeep.clone(celebritiesMock);
      const action = CelebritiesActions.getAllCelebrities();
      const actionSuccess = CelebritiesActions.getAllCelebritiesSuccess({ celebrities });
      const url = `${serverUrls.celebrities}`;

      // Act
      actions$.next(action);

      effects.getAllCelebrities$.subscribe((response) => {

        // Assert
        expect(response).toEqual(actionSuccess);

      });
      const request: TestRequest = httpMock.expectOne(url);
      request.flush(celebrities);


    });

    it(`Should return a fail action when service response fails`, () => {

      // Arrange
      const url = `${serverUrls.celebrities}`;
      const error = { message: 'Error' };

      const action = CelebritiesActions.getAllCelebrities();
      const actionFail = CelebritiesActions.getAllCelebritiesFail({ error });

      const errorInfo = new ErrorEvent('Error');

      // Act
      actions$.next(action);

      effects.getAllCelebrities$.subscribe((response) => {
        // Assert
        expect(response.type).toEqual(actionFail.type);
      });
      const request: TestRequest = httpMock.expectOne(url);
      request.error(errorInfo);

    });

  });



  describe('#voteCelebrity$', () => {

    it(`Should return a success action if the service response is successful`, () => {

      // Arrange
      const celebrity: Celebrity = CloneDataInDeep.clone(celebritiesMock[0]);
      const action = CelebritiesActions.voteCelebrity({ celebrity });
      const updateCelebrity: Update<Celebrity> = {
        changes: {
          ...action.celebrity,
          votes: celebrity.votes
        },
        id: action.celebrity.id
      }
      const actionSuccess = CelebritiesActions.voteCelebritySuccess({ celebrity: updateCelebrity });

      // Act
      actions$.next(action);

      effects.voteCelebrity$.subscribe((response) => {

        // Assert
        expect(response).toEqual(actionSuccess);

      });



    });

  });

});
