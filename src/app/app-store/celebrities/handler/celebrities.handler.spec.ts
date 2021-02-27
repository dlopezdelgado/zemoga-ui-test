import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { CelebritiesService } from 'src/app/core/services/celebrities/celebrities.service';
import { AppStoreModule } from '../../app-store.module';
import { CelebritiesHandler } from './celebrities.handler';




describe('Celebrities Handler Service (Selectors/Dispatchers)', () => {

  let service: CelebritiesHandler;
  let store$: Store;
  let httpMock: HttpTestingController;
  let celebritiesService: CelebritiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppStoreModule, HttpClientTestingModule],
      providers: [CelebritiesService]
    });
    service = TestBed.inject(CelebritiesHandler);
    store$ = TestBed.inject(Store);
    httpMock = TestBed.inject(HttpTestingController);
    celebritiesService = TestBed.inject(CelebritiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  describe('All tests without actions', () => {

    describe('#Listen Selectors', () => {

      it('should listen get all celebrities loading', () => {
        // Arrange
        spyOn(store$,'dispatch');

        // Act
        service.loadCelebrities();

        // Assert
        expect(store$.dispatch).toHaveBeenCalled();
        
      });      

    });
    

  });


})
