import { Celebrity } from "src/app/shared/models/celebrity.model";
import { celebritiesMock } from "src/app/shared/utils/mocks/celebrities.mock";
import { CloneDataInDeep } from "typescript-clone-data-in-deep";

import * as CelebritySelectors from './celebrity.selectors';

describe('Celebrity Selectors', () => {
  
  describe('select all technicians', () => {

    it('should return all technicians on the state', () => {
      // Arrange
      const celebrities: Celebrity[] = CloneDataInDeep.clone([celebritiesMock[0], celebritiesMock[1]]);

      const appState = {
        celebrities: {
          entities: { [celebrities[0].id]: celebrities[0], [celebrities[1].id]: celebrities[1] },
          ids: [celebrities[0].id, celebrities[1].id]
        }
      };

      // Act
      const result = CelebritySelectors.selectAllCelebrities(appState);

      // Assert
      expect(result).toEqual(celebrities);

    });
  });

  describe('Select Loaders', () => {

    it('should return loadingCelebrities value', () => {
      // Arrange
      const appState = {
        celebrities: {
          loadingCelebrities: true,
        }
      };
      const loadingExpected = true;
      // Act
      const result = CelebritySelectors.selectLoadingCelebrities(appState);

      // Assert
      expect(result).toEqual(loadingExpected);
    });
    
  })
  

});
