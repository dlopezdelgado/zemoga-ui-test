import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AppStoreModule } from 'src/app/app-store/app-store.module';
import { CandidatesHandler } from 'src/app/app-store/candidates/handler/candidates.handler';
import { CandidatesService } from 'src/app/core/services/candidates/candidates.service';
import { Candidate, Vote } from 'src/app/shared/models/candidate.model';
import { serverUrls } from 'src/app/shared/utils/constants/app-urls';
import { messages } from 'src/app/shared/utils/constants/constants';
import { candidatesMock } from 'src/app/shared/utils/mocks/candidates.mock';
import { CloneDataInDeep } from 'typescript-clone-data-in-deep';
import { CandidateCardComponent } from '../candidate-card/candidate-card.component';

import { CandidatesListComponent } from './candidates-list.component';

describe('CandidatesListComponent', () => {
  let component: CandidatesListComponent;
  let fixture: ComponentFixture<CandidatesListComponent>;

  let httpMock: HttpTestingController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CandidatesListComponent, CandidateCardComponent],
      providers: [
        CandidatesHandler,
        CandidatesService
      ],
      imports: [
        AppStoreModule,
        HttpClientTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    httpMock = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(CandidatesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#getCandidates', () => {


    it(`get candidates successfully`, () => {
      // Arrange:
      const candidates: Candidate[] = CloneDataInDeep.clone<Candidate[]>([candidatesMock[0], candidatesMock[1]]);
      const url = `${serverUrls.candidates}`;

      // Act:
      fixture.detectChanges();

      const request: TestRequest = httpMock.expectOne(url);
      request.flush(candidates);

      fixture.detectChanges();

      const errorLoadingCandidates: HTMLElement = fixture.nativeElement.querySelector('#errorLoadingCandidates');

      // Assert:
      expect(component.candidates?.length).toBe(2);
      expect(errorLoadingCandidates).toBeNull();
    });


    it(`get candidates fails and send error message because service response fail`, () => {

      // Act:
      fixture.detectChanges();

      const request: TestRequest = httpMock.expectOne(`${serverUrls.candidates}`);
      const errorInfo = new ErrorEvent('Error fetching data');
      request.error(errorInfo);

      fixture.detectChanges();


      const errorLoadingCandidates: HTMLElement = fixture.nativeElement.querySelector('#errorLoadingCandidates');

      // Assert:
      expect(component.candidates?.length).toBe(0);
      expect(component.candidatesError?.message).toContain(messages.candidates.getCandidatesError);
      expect(errorLoadingCandidates).not.toBeNull();
    });

  });


  describe('#voteCandidate', () => {

    it('Should return undefined if there is no votes attribute on candidate object', () => {
      // Arrange
      const candidate: Candidate = CloneDataInDeep.clone({...candidatesMock[0], votes: undefined});
      const voteType = 'positive';

      // Act
      const response = component.voteCandidate({ candidate, voteType });

      // Assert
      expect(response).toBeUndefined();

    });

    it('Should call voteCandidate from candidatesHandler with a positive vote', () => {

      // Arrange:

      const candidate: Candidate = CloneDataInDeep.clone({...candidatesMock[0], votes: []});

      const vote: Vote = {
        negativeVote: false,
        positiveVote: true
      };

      spyOn(component.candidatesHandler, 'updateCandidate');


      fixture.detectChanges();

      const voteType = 'positive';

      const expectedCandidate: Candidate = {
        ...candidate,
        votes: [vote]
      };


      // Act
      component.voteCandidate({ candidate, voteType });
      fixture.detectChanges();


      // Assert
      expect(component.candidatesHandler.updateCandidate).toHaveBeenCalledWith(expectedCandidate);


    });

  });

});
