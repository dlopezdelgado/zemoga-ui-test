import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, tap } from 'rxjs/operators';
import { CelebritiesHandler } from 'src/app/app-store/celebrities/handler/celebrities.handler';
import { Celebrity, Vote } from 'src/app/shared/models/celebrity.model';
import { ErrorModel } from 'src/app/shared/models/error.model';
import { messages } from 'src/app/shared/utils/constants/constants';
import { celebritiesMock } from 'src/app/shared/utils/mocks/celebrities.mock';
import { SubCollection } from 'src/app/shared/utils/rx/sub-collection';
import { CloneDataInDeep } from 'typescript-clone-data-in-deep';

@Component({
  selector: 'app-celebrities-list',
  templateUrl: './celebrities-list.component.html',
  styleUrls: ['./celebrities-list.component.scss']
})
export class CelebritiesListComponent implements OnInit, OnDestroy {

  celebrities: Celebrity[] | undefined;
  celebritiesError: ErrorModel | undefined;

  subs = new SubCollection();

  constructor(
    public celebritiesHandler: CelebritiesHandler
  ) { }

  ngOnInit(): void {
    this.dispatchGetCelebrities();
    this.getCelebrities();
    this.getCelebritiesError();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  dispatchGetCelebrities(): void {
    this.celebritiesHandler.loadCelebrities();
  }

  getCelebrities(): void {
    this.subs.add = this.celebritiesHandler.getCelebrities$.pipe(
      tap((celebrities) => this.celebrities = celebrities)
    ).subscribe();
  }

  getCelebritiesError(): void {
    this.subs.add = this.celebritiesHandler.errorList$.subscribe(
      () => {
        this.celebritiesError = { message: messages.celebrities.getCelebritiesError };
      }
    );
  }

  voteCelebrity(voteInfo: {celebrity: Celebrity, voteType: string}): void {
    const {celebrity, voteType} = voteInfo;
    const updatedCelebrity = CloneDataInDeep.clone(celebrity);
    const positiveVote: boolean = voteType === 'positive';
    const vote: Vote = {
      positiveVote,
      negativeVote: !positiveVote
    };
    updatedCelebrity.votes?.push(vote);
    this.celebritiesHandler.voteCelebrity(updatedCelebrity);
  }

}
