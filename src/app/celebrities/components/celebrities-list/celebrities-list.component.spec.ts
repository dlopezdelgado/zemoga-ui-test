import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AppStoreModule } from 'src/app/app-store/app-store.module';
import { CelebritiesHandler } from 'src/app/app-store/celebrities/handler/celebrities.handler';
import { CelebritiesService } from 'src/app/core/services/celebrities/celebrities.service';
import { Celebrity } from 'src/app/shared/models/celebrity.model';
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
      declarations: [ CelebritiesListComponent, CelebrityCardComponent ],
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


    // it(`get celebrities fails and send error message because service response fail`, () => {

    //   // Act:
    //   fixture.detectChanges();

    //   const request: TestRequest = httpMock.expectOne(`${serverUrls.celebrities}`);
    //   const errorInfo = new ErrorEvent('Error fetching data');
    //   request.error(errorInfo);

    //   fixture.detectChanges();

    //   const errorLoadingCelebrities: HTMLElement = fixture.nativeElement.querySelector('#errorLoadingCelebrities');

    //   // Assert:
    //   expect(component.celebrities?.length).toBe(0);
    //   expect(errorLoadingCelebrities.textContent).toContain(messages.celebrities.getCelebritiesError);
    // });

  });
});
