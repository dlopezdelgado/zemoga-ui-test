import { CloneDataInDeep } from 'typescript-clone-data-in-deep';
import { Celebrity } from '../../models/celebrity.model';
import { celebritiesMock } from '../mocks/celebrities.mock';
import { createCelebritiesForTesting } from './test-functions.utils';


describe('#TestFunctions', () => {

  describe('#createCelebritiesForTesting', () => {

    it(`Should call a dispatch method for creating new celebrities`, () => {
      // Arrange
      const celebrity: Celebrity[] = CloneDataInDeep.clone(celebritiesMock);
      const store: any = {
        dispatch() { }
      };
      spyOn(store, 'dispatch').and.callThrough();

      // Act
      createCelebritiesForTesting(celebrity, store);

      // Assert
      expect(store.dispatch).toHaveBeenCalledTimes(celebrity.length);
      expect(store.dispatch).toHaveBeenCalled();
    });

  });

});


