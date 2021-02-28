import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Celebrity, Vote } from 'src/app/shared/models/celebrity.model';
import { celebritiesMock } from 'src/app/shared/utils/mocks/celebrities.mock';
import { votesMock } from 'src/app/shared/utils/mocks/votes.mock';
import { CloneDataInDeep } from 'typescript-clone-data-in-deep';

import { CelebrityCardBusinessLogic, CelebrityCardComponent } from './celebrity-card.component';


describe('CelebrityCardBusinessLogic (Full TDD)', () => {

  describe('#getTotalVotes', () => {
    it('Should return [0,0] if there are no votes for select celebrity', () => {
      // Arrange
      const celebrity: Celebrity = CloneDataInDeep.clone({ ...celebritiesMock[0], votes: [] });
      const expectedResult = [0, 0];

      // Act
      const votesResult = CelebrityCardBusinessLogic.getTotalVotes(celebrity);

      // Assert
      expect(votesResult).toEqual(expectedResult);

    });

    it('Should return [0,0] if there votes attribute for select celebrity is undefined', () => {
      // Arrange
      const celebrity: Celebrity = CloneDataInDeep.clone({ ...celebritiesMock[0], votes: undefined });
      const expectedResult = [0, 0];

      // Act
      const votesResult = CelebrityCardBusinessLogic.getTotalVotes(celebrity);

      // Assert
      expect(votesResult).toEqual(expectedResult);

    });

    it('Should return [1, 0] if there is only one positive vote', () => {
      // Arrange
      const vote: Vote = {
        positiveVote: true,
        negativeVote: false
      };
      const celebrity: Celebrity = CloneDataInDeep.clone({ ...celebritiesMock[0], votes: [vote] });
      const expectedResult = [1, 0];

      // Act
      const votesResult = CelebrityCardBusinessLogic.getTotalVotes(celebrity);

      // Assert
      expect(votesResult).toEqual(expectedResult);

    });

    it('Should return [0, 1] if there is only one negative vote', () => {
      // Arrange
      const vote: Vote = {
        positiveVote: false,
        negativeVote: true
      };
      const celebrity: Celebrity = CloneDataInDeep.clone({ ...celebritiesMock[0], votes: [vote] });
      const expectedResult = [0, 1];

      // Act
      const votesResult = CelebrityCardBusinessLogic.getTotalVotes(celebrity);

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
      const celebrity: Celebrity = CloneDataInDeep.clone({ ...celebritiesMock[0], votes });
      const expectedResult = [1, 1];

      // Act
      const votesResult = CelebrityCardBusinessLogic.getTotalVotes(celebrity);

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
      const celebrity: Celebrity = CloneDataInDeep.clone({ ...celebritiesMock[0], votes });
      const expectedResult = [3, 2];

      // Act
      const votesResult = CelebrityCardBusinessLogic.getTotalVotes(celebrity);

      // Assert
      expect(votesResult).toEqual(expectedResult);

    });
  });

  describe('#calculateVotesPercentages', () => {
    it('Should return [0,0] if there are no votes for select celebrity', () => {
      // Arrange
      const celebrity: Celebrity = CloneDataInDeep.clone({ ...celebritiesMock[0], votes: [] });
      const expectedResult = [0, 0];

      // Act
      const votesResult = CelebrityCardBusinessLogic.calculateVotesPercentages(celebrity);

      // Assert
      expect(votesResult).toEqual(expectedResult);

    });

    it('Should return [0,0] if there votes attribute for select celebrity is undefined', () => {
      // Arrange
      const celebrity: Celebrity = CloneDataInDeep.clone({ ...celebritiesMock[0], votes: undefined });
      const expectedResult = [0, 0];

      // Act
      const votesResult = CelebrityCardBusinessLogic.calculateVotesPercentages(celebrity);

      // Assert
      expect(votesResult).toEqual(expectedResult);

    });

    it('Should return [100, 0] if there is only one positive vote', () => {
      // Arrange
      const vote: Vote = {
        positiveVote: true,
        negativeVote: false
      };
      const celebrity: Celebrity = CloneDataInDeep.clone({ ...celebritiesMock[0], votes: [vote] });
      const expectedResult = [100, 0];

      // Act
      const votesResult = CelebrityCardBusinessLogic.calculateVotesPercentages(celebrity);

      // Assert
      expect(votesResult).toEqual(expectedResult);

    });

    it('Should return [0, 100] if there is only one negative vote', () => {
      // Arrange
      const vote: Vote = {
        positiveVote: false,
        negativeVote: true
      };
      const celebrity: Celebrity = CloneDataInDeep.clone({ ...celebritiesMock[0], votes: [vote] });
      const expectedResult = [0, 100];

      // Act
      const votesResult = CelebrityCardBusinessLogic.calculateVotesPercentages(celebrity);

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
      const celebrity: Celebrity = CloneDataInDeep.clone({ ...celebritiesMock[0], votes });
      const expectedResult = [50, 50];

      // Act
      const votesResult = CelebrityCardBusinessLogic.calculateVotesPercentages(celebrity);

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
      const celebrity: Celebrity = CloneDataInDeep.clone({ ...celebritiesMock[0], votes });
      const expectedResult = [60, 40];

      // Act
      const votesResult = CelebrityCardBusinessLogic.calculateVotesPercentages(celebrity);

      // Assert
      expect(votesResult).toEqual(expectedResult);

    });
  });


});



describe('CelebrityCardComponent', () => {
  let component: CelebrityCardComponent;
  let fixture: ComponentFixture<CelebrityCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CelebrityCardComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CelebrityCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  describe('#vote', () => {

    it('Should emit celebrity and type of vote to the parent component', () => {

      // Arrange
      component.celebrity = CloneDataInDeep.clone(celebritiesMock[0]);
      const value = 'positive';

      spyOn(component.voteClick, 'emit');

      const expectedParams = {
        celebrity: component.celebrity,
        voteType: value
      };

      // Act
      component.vote(value);

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
      component.celebrity = CloneDataInDeep.clone({...celebritiesMock[0], votes });

      // Act
      component.getVotesPercents();

      const expectedVotesPercents = [50, 50];

      // Assert
      expect(component.votesPercents).toEqual(expectedVotesPercents);

    });

  });


});
