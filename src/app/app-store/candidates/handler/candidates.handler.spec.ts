import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { CandidatesService } from 'src/app/core/services/candidates/candidates.service';
import { AppStoreModule } from '../../app-store.module';
import { CandidatesHandler } from './candidates.handler';




describe('Candidates Handler Service (Selectors/Dispatchers)', () => {

  let service: CandidatesHandler;
  let store$: Store;
  let httpMock: HttpTestingController;
  let candidatesService: CandidatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppStoreModule, HttpClientTestingModule],
      providers: [CandidatesService]
    });
    service = TestBed.inject(CandidatesHandler);
    store$ = TestBed.inject(Store);
    httpMock = TestBed.inject(HttpTestingController);
    candidatesService = TestBed.inject(CandidatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  describe('All tests without actions', () => {

    describe('#Listen Selectors', () => {

      it('should listen get all candidates loading', () => {
        // Arrange
        spyOn(store$, 'dispatch');

        // Act
        service.loadCandidates();

        // Assert
        expect(store$.dispatch).toHaveBeenCalled();

      });

    });


  });


});
