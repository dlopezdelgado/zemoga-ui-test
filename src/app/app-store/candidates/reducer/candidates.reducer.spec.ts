import { candidateInitialState, CandidateState, reducer } from './candidates.reducer';

import * as CandidatesActions from '../actions/candidates.actions';
import { candidatesMock } from 'src/app/shared/utils/mocks/candidates.mock';
import { ErrorModel } from 'src/app/shared/models/error.model';
import { Candidate } from 'src/app/shared/models/candidate.model';
import { CloneDataInDeep } from 'typescript-clone-data-in-deep';

describe('Candidates Reducer', () => {

  describe('Get Candidates', () => {

    it('Should set loadingCandidates to true if getCandidates action is called', () => {

      // Arrange
      const loadingCandidates = false;
      const currentState: CandidateState = { ...candidateInitialState, loadingCandidates };
      const action = CandidatesActions.getAllCandidates();
      const loadingExpected = true;

      // Act
      const newState = reducer(currentState, action);

      // Assert
      expect(newState.loadingCandidates).toEqual(loadingExpected);


    });

    it(`Should set loadingCandidates to false and set the list of candidates
      in the state when getAllCandidatesSuccess action is called`, () => {

      // Arrange
      const loadingCandidates = true;
      const currentState: CandidateState = { ...candidateInitialState, loadingCandidates };
      const action = CandidatesActions.getAllCandidatesSuccess({ candidates: candidatesMock });
      const loadingExpected = false;
      const sizeExpected = candidatesMock.length;

      // Act
      const newState = reducer(currentState, action);

      // Assert
      expect(newState.loadingCandidates).toEqual(loadingExpected);
      expect(newState.ids.length).toEqual(sizeExpected);


    });


    it(`Should set loadingCandidates to false when getAllCandidatesFail action is called`, () => {

      // Arrange
      const loadingCandidates = true;
      const errorResp: ErrorModel = {
        message: 'Error message'
      };
      const currentState: CandidateState = { ...candidateInitialState, loadingCandidates };
      const action = CandidatesActions.getAllCandidatesFail({ error: errorResp });
      const loadingExpected = false;
      const sizeExpected = candidatesMock.length;

      // Act
      const newState = reducer(currentState, action);

      // Assert
      expect(newState.loadingCandidates).toEqual(loadingExpected);

    });

  });

});
