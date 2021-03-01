import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Candidate, Vote } from 'src/app/shared/models/candidate.model';
import { candidatesMock } from 'src/app/shared/utils/mocks/candidates.mock';
import { votesMock } from 'src/app/shared/utils/mocks/votes.mock';
import { CloneDataInDeep } from 'typescript-clone-data-in-deep';

import { CandidateCardBusinessLogic, CandidateCardComponent } from './candidate-card.component';


describe('CandidateCardBusinessLogic (Full TDD)', () => {

  describe('#getTotalVotes', () => {
    it('Should return [0,0] if there are no votes for select candidate', () => {
      // Arrange
      const candidate: Candidate = CloneDataInDeep.clone({ ...candidatesMock[0], votes: [] });
      const expectedResult = [0, 0];

      // Act
      const votesResult = CandidateCardBusinessLogic.getTotalVotes(candidate);

      // Assert
      expect(votesResult).toEqual(expectedResult);

    });

    it('Should return [0,0] if there votes attribute for select candidate is undefined', () => {
      // Arrange
      const candidate: Candidate = CloneDataInDeep.clone({ ...candidatesMock[0], votes: undefined });
      const expectedResult = [0, 0];

      // Act
      const votesResult = CandidateCardBusinessLogic.getTotalVotes(candidate);

      // Assert
      expect(votesResult).toEqual(expectedResult);

    });

    it('Should return [1, 0] if there is only one positive vote', () => {
      // Arrange
      const vote: Vote = {
        positiveVote: true,
        negativeVote: false
      };
      const candidate: Candidate = CloneDataInDeep.clone({ ...candidatesMock[0], votes: [vote] });
      const expectedResult = [1, 0];

      // Act
      const votesResult = CandidateCardBusinessLogic.getTotalVotes(candidate);

      // Assert
      expect(votesResult).toEqual(expectedResult);

    });

    it('Should return [0, 1] if there is only one negative vote', () => {
      // Arrange
      const vote: Vote = {
        positiveVote: false,
        negativeVote: true
      };
      const candidate: Candidate = CloneDataInDeep.clone({ ...candidatesMock[0], votes: [vote] });
      const expectedResult = [0, 1];

      // Act
      const votesResult = CandidateCardBusinessLogic.getTotalVotes(candidate);

      // Assert
      expect(votesResult).toEqual(expectedResult);

    });

    it('Should return [1,1] if there is only one negative vote and one positive vote', () => {
      // Arrange
      const votes: Vote[] = [
        {
          positiveVote: false,
          negativeVote: true
        },
        {
          positiveVote: true,
          negativeVote: false
        }
      ];
      const candidate: Candidate = CloneDataInDeep.clone({ ...candidatesMock[0], votes });
      const expectedResult = [1, 1];

      // Act
      const votesResult = CandidateCardBusinessLogic.getTotalVotes(candidate);

      // Assert
      expect(votesResult).toEqual(expectedResult);

    });


    it('Should return [3,2] if there is only one negative vote and one positive vote', () => {
      // Arrange
      const votes: Vote[] = [
        {
          positiveVote: false,
          negativeVote: true
        },
        {
          positiveVote: true,
          negativeVote: false
        },
        {
          positiveVote: true,
          negativeVote: false
        },
        {
          positiveVote: true,
          negativeVote: false
        },
        {
          positiveVote: false,
          negativeVote: true
        }
      ];
      const candidate: Candidate = CloneDataInDeep.clone({ ...candidatesMock[0], votes });
      const expectedResult = [3, 2];

      // Act
      const votesResult = CandidateCardBusinessLogic.getTotalVotes(candidate);

      // Assert
      expect(votesResult).toEqual(expectedResult);

    });
  });

  describe('#calculateVotesPercentages', () => {
    it('Should return [0,0] if there are no votes for select candidate', () => {
      // Arrange
      const candidate: Candidate = CloneDataInDeep.clone({ ...candidatesMock[0], votes: [] });
      const expectedResult = [0, 0];

      // Act
      const votesResult = CandidateCardBusinessLogic.calculateVotesPercentages(candidate);

      // Assert
      expect(votesResult).toEqual(expectedResult);

    });

    it('Should return [0,0] if there votes attribute for select candidate is undefined', () => {
      // Arrange
      const candidate: Candidate = CloneDataInDeep.clone({ ...candidatesMock[0], votes: undefined });
      const expectedResult = [0, 0];

      // Act
      const votesResult = CandidateCardBusinessLogic.calculateVotesPercentages(candidate);

      // Assert
      expect(votesResult).toEqual(expectedResult);

    });

    it('Should return [100, 0] if there is only one positive vote', () => {
      // Arrange
      const vote: Vote = {
        positiveVote: true,
        negativeVote: false
      };
      const candidate: Candidate = CloneDataInDeep.clone({ ...candidatesMock[0], votes: [vote] });
      const expectedResult = [100, 0];

      // Act
      const votesResult = CandidateCardBusinessLogic.calculateVotesPercentages(candidate);

      // Assert
      expect(votesResult).toEqual(expectedResult);

    });

    it('Should return [0, 100] if there is only one negative vote', () => {
      // Arrange
      const vote: Vote = {
        positiveVote: false,
        negativeVote: true
      };
      const candidate: Candidate = CloneDataInDeep.clone({ ...candidatesMock[0], votes: [vote] });
      const expectedResult = [0, 100];

      // Act
      const votesResult = CandidateCardBusinessLogic.calculateVotesPercentages(candidate);

      // Assert
      expect(votesResult).toEqual(expectedResult);

    });

    it('Should return [50, 50] if there is only one negative vote and one positive vote', () => {
      // Arrange
      const votes: Vote[] = [
        {
          positiveVote: false,
          negativeVote: true
        },
        {
          positiveVote: true,
          negativeVote: false
        }
      ];
      const candidate: Candidate = CloneDataInDeep.clone({ ...candidatesMock[0], votes });
      const expectedResult = [50, 50];

      // Act
      const votesResult = CandidateCardBusinessLogic.calculateVotesPercentages(candidate);

      // Assert
      expect(votesResult).toEqual(expectedResult);

    });


    it('Should return [60,40] if there is only one negative vote and one positive vote', () => {
      // Arrange
      const votes: Vote[] = [
        {
          positiveVote: false,
          negativeVote: true
        },
        {
          positiveVote: false,
          negativeVote: true
        },
        {
          positiveVote: true,
          negativeVote: false
        },
        {
          positiveVote: true,
          negativeVote: false
        },
        {
          positiveVote: true,
          negativeVote: false
        }
      ];
      const candidate: Candidate = CloneDataInDeep.clone({ ...candidatesMock[0], votes });
      const expectedResult = [60, 40];

      // Act
      const votesResult = CandidateCardBusinessLogic.calculateVotesPercentages(candidate);

      // Assert
      expect(votesResult).toEqual(expectedResult);

    });
  });


});



describe('CandidateCardComponent', () => {
  let component: CandidateCardComponent;
  let fixture: ComponentFixture<CandidateCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CandidateCardComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  describe('#vote', () => {

    it('Should emit candidate and type of vote to the parent component', () => {

      // Arrange
      component.candidate = CloneDataInDeep.clone(candidatesMock[0]);
      const value = 'positive';

      spyOn(component.voteClick, 'emit');

      const expectedParams = {
        candidate: component.candidate,
        voteType: value
      };

      // Act
      component.sendVote(value);

      // Assert
      expect(component.voteClick.emit).toHaveBeenCalledWith(expectedParams);

    });

  });

  describe('#getVotesPercents', () => {

    it('Should assign votes percentages to votesPercentages attribute', () => {

      // Arrange
      const votes: Vote[] = [
        {
          positiveVote: false,
          negativeVote: true
        },
        {
          positiveVote: true,
          negativeVote: false
        }
      ];
      component.candidate = CloneDataInDeep.clone({...candidatesMock[0], votes });

      // Act
      component.getVotesPercents();

      const expectedVotesPercents = [50, 50];

      // Assert
      expect(component.votesPercents).toEqual(expectedVotesPercents);

    });

  });


});
