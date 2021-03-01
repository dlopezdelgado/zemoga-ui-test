import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Candidate } from 'src/app/shared/models/candidate.model';
import { serverUrls } from 'src/app/shared/utils/constants/app-urls';
import { candidatesMock } from 'src/app/shared/utils/mocks/candidates.mock';
import { votesMock } from 'src/app/shared/utils/mocks/votes.mock';
import { CloneDataInDeep } from 'typescript-clone-data-in-deep';

import { CandidatesService } from './candidates.service';

describe('CandidatesService', () => {
  let service: CandidatesService;
  let httpMock: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CandidatesService
      ],
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(CandidatesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getAll', () => {

    it('Should call http request with candidates path to get all candidates', () => {

      // Arrange
      const candidatesResponse: Candidate[] = CloneDataInDeep.clone(candidatesMock);
      const url = `${serverUrls.candidates}`;


      // Act
      service.getAll().subscribe(
        (resp: any) => {
          expect(resp).toEqual(candidatesResponse);

        }
      );

      const request: TestRequest = httpMock.expectOne(url);
      request.flush(candidatesResponse);

      // Assert
      expect(request.request.method).toBe('GET');

    });



  });

  describe('#updateCandidate', () => {

    it('Should call http request with update candidate path with selected candidate', () => {

      // Arrange
      const candidate: Candidate = CloneDataInDeep.clone(candidatesMock[0]);
      const url = `${serverUrls.candidates}${candidate._id}`;

      const updatedCandidate: Candidate = {
        ...candidate,
        votes: [votesMock[0]]
      };


      // Act
      service.updateCandidate(updatedCandidate).subscribe(
        (resp: any) => {
          expect(resp).toEqual(updatedCandidate);

        }
      );

      const request: TestRequest = httpMock.expectOne(url);
      request.flush(updatedCandidate);

      // Assert
      expect(request.request.method).toBe('PUT');

    });



  });


});
