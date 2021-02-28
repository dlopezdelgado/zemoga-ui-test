import { Candidate } from 'src/app/shared/models/candidate.model';
import { candidatesMock } from 'src/app/shared/utils/mocks/candidates.mock';
import { CloneDataInDeep } from 'typescript-clone-data-in-deep';

import * as CandidateSelectors from './candidate.selectors';

describe('Candidate Selectors', () => {

  describe('select all technicians', () => {

    it('should return all technicians on the state', () => {
      // Arrange
      const candidates: Candidate[] = CloneDataInDeep.clone([candidatesMock[0], candidatesMock[1]]);

      const appState = {
        candidates: {
          entities: { [candidates[0].id]: candidates[0], [candidates[1].id]: candidates[1] },
          ids: [candidates[0].id, candidates[1].id]
        }
      };

      // Act
      const result = CandidateSelectors.selectAllCandidates(appState);

      // Assert
      expect(result).toEqual(candidates);

    });
  });

  describe('Select Loaders', () => {

    it('should return loadingCandidates value', () => {
      // Arrange
      const appState = {
        candidates: {
          loadingCandidates: true,
        }
      };
      const loadingExpected = true;
      // Act
      const result = CandidateSelectors.selectLoadingCandidates(appState);

      // Assert
      expect(result).toEqual(loadingExpected);
    });

  });


});
