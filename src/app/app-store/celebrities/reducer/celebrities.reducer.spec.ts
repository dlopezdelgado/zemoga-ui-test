import { celebrityInitialState, CelebrityState, reducer } from "./celebrities.reducer";

import * as CelebritiesActions from '../actions/celebrities.actions';
import { celebritiesMock } from "src/app/shared/utils/mocks/celebrities.mock";
import { ErrorModel } from "src/app/shared/models/error.model";
import { Celebrity } from "src/app/shared/models/celebrity.model";
import { CloneDataInDeep } from "typescript-clone-data-in-deep";

describe('Celebrities Reducer', () => {

  describe('Get Celebrities', () => {

    it('Should set loadingCelebrities to true if getCelebrities action is called', () => {

      // Arrange
      const loadingCelebrities = false;
      const currentState: CelebrityState = { ...celebrityInitialState, loadingCelebrities };
      const action = CelebritiesActions.getAllCelebrities();
      const loadingExpected = true;

      // Act
      const newState = reducer(currentState, action);

      // Assert
      expect(newState.loadingCelebrities).toEqual(loadingExpected);


    });

    it(`Should set loadingCelebrities to false and set the list of celebrities 
      in the state when getAllCelebritiesSuccess action is called`, () => {

      // Arrange
      const loadingCelebrities = true;
      const currentState: CelebrityState = { ...celebrityInitialState, loadingCelebrities };
      const action = CelebritiesActions.getAllCelebritiesSuccess({ celebrities: celebritiesMock });
      const loadingExpected = false;
      const sizeExpected = celebritiesMock.length;

      // Act
      const newState = reducer(currentState, action);

      // Assert
      expect(newState.loadingCelebrities).toEqual(loadingExpected);
      expect(newState.ids.length).toEqual(sizeExpected);


    });


    it(`Should set loadingCelebrities to false when getAllCelebritiesFail action is called`, () => {

      // Arrange
      const loadingCelebrities = true;
      const errorResp: ErrorModel = {
        message: 'Error message'
      }
      const currentState: CelebrityState = { ...celebrityInitialState, loadingCelebrities };
      const action = CelebritiesActions.getAllCelebritiesFail({ error: errorResp });
      const loadingExpected = false;
      const sizeExpected = celebritiesMock.length;

      // Act
      const newState = reducer(currentState, action);

      // Assert
      expect(newState.loadingCelebrities).toEqual(loadingExpected);

    });

  });

});
