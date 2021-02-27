import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Celebrity } from 'src/app/shared/models/celebrity.model';
import { serverUrls } from 'src/app/shared/utils/constants/app-urls';
import { celebritiesMock } from 'src/app/shared/utils/mocks/celebrities.mock';
import { CloneDataInDeep } from 'typescript-clone-data-in-deep';

import { CelebritiesService } from './celebrities.service';

describe('CelebritiesService', () => {
  let service: CelebritiesService;
  let httpMock: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CelebritiesService
      ],
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(CelebritiesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getAll', () => {

    it('Should call http request with celebrities path to get all celebrities', () => {

      // Arrange
      const celebritiesResponse: Celebrity[] = CloneDataInDeep.clone(celebritiesMock);
      const url = `${serverUrls.celebrities}`;


      // Act
      service.getAll().subscribe(
        (resp: any) => {
          console.log(resp);
          expect(resp).toEqual(celebritiesResponse);

        }
      );

      const request: TestRequest = httpMock.expectOne(url);
      request.flush(celebritiesResponse);

      // Assert
      expect(request.request.method).toBe('GET');

    });



  });


});
