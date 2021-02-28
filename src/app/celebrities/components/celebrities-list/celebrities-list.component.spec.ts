import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AppStoreModule } from 'src/app/app-store/app-store.module';
import { CelebritiesHandler } from 'src/app/app-store/celebrities/handler/celebrities.handler';
import { CelebritiesService } from 'src/app/core/services/celebrities/celebrities.service';
import { Celebrity, Vote } from 'src/app/shared/models/celebrity.model';
import { serverUrls } from 'src/app/shared/utils/constants/app-urls';
import { messages } from 'src/app/shared/utils/constants/constants';
import { celebritiesMock } from 'src/app/shared/utils/mocks/celebrities.mock';
import { CloneDataInDeep } from 'typescript-clone-data-in-deep';
import { CelebrityCardComponent } from '../celebrity-card/celebrity-card.component';

import { CelebritiesListComponent } from './celebrities-list.component';

describe('CelebritiesListComponent', () => {
  let component: CelebritiesListComponent;
  let fixture: ComponentFixture<CelebritiesListComponent>;

  let httpMock: HttpTestingController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CelebritiesListComponent, CelebrityCardComponent],
      providers: [
        CelebritiesHandler,
        CelebritiesService
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
    fixture = TestBed.createComponent(CelebritiesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#getCelebrities', () => {


    it(`get celebrities successfully`, () => {
      // Arrange:
      const celebrities: Celebrity[] = CloneDataInDeep.clone<Celebrity[]>([celebritiesMock[0], celebritiesMock[1]]);
      const url = `${serverUrls.celebrities}`;

      // Act:
      fixture.detectChanges();

      const request: TestRequest = httpMock.expectOne(url);
      request.flush(celebrities);

      fixture.detectChanges();

      const errorLoadingCelebrities: HTMLElement = fixture.nativeElement.querySelector('#errorLoadingCelebrities');

      // Assert:
      expect(component.celebrities?.length).toBe(2);
      expect(errorLoadingCelebrities).toBeNull();
    });


    it(`get celebrities fails and send error message because service response fail`, () => {

      // Act:
      fixture.detectChanges();

      const request: TestRequest = httpMock.expectOne(`${serverUrls.celebrities}`);
      const errorInfo = new ErrorEvent('Error fetching data');
      request.error(errorInfo);

      fixture.detectChanges();


      const errorLoadingCelebrities: HTMLElement = fixture.nativeElement.querySelector('#errorLoadingCelebrities');

      // Assert:
      expect(component.celebrities?.length).toBe(0);
      expect(component.celebritiesError?.message).toContain(messages.celebrities.getCelebritiesError);
      expect(errorLoadingCelebrities).not.toBeNull();
    });

  });


  describe('#voteCelebrity', () => {

    it('Should return undefined if there is no votes attribute on celebrity object', () => {
      // Arrange
      const celebrity: Celebrity = CloneDataInDeep.clone({...celebritiesMock[0], votes: undefined});
      const voteType = 'positive';

      // Act
      const response = component.voteCelebrity({ celebrity, voteType });
      
      // Assert
      expect(response).toBeUndefined();
      
    })

    it('Should call voteCelebrity from celebritiesHandler with a positive vote', () => {

      // Arrange:
      const celebrities: Celebrity[] = CloneDataInDeep.clone<Celebrity[]>([{ ...celebritiesMock[0], votes: [] }, celebritiesMock[1]]);
      const url = `${serverUrls.celebrities}`;

      fixture.detectChanges();

      const request: TestRequest = httpMock.expectOne(url);
      request.flush(celebrities);

      fixture.detectChanges();

      const celebrity: Celebrity = celebrities[0];
      const vote: Vote = {
        negativeVote: false,
        positiveVote: true
      };

      const voteType = 'positive';

      const expectedCelebrity: Celebrity = {
        ...celebrity,
        votes: [vote]
      }

      // Act
      component.voteCelebrity({ celebrity, voteType });
      fixture.detectChanges();

      // Assert
      component.celebritiesHandler.getCelebrities$.subscribe(
        (resp) => {
          const updatedCelebrity = resp.filter(cel => cel.id === celebrity.id);
          expect(updatedCelebrity[0]).toEqual(expectedCelebrity);
        }
      );

    });

  });

});
