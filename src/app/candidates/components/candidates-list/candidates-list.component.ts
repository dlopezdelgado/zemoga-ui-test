import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, tap } from 'rxjs/operators';
import { CandidatesHandler } from 'src/app/app-store/candidates/handler/candidates.handler';
import { Candidate, Vote } from 'src/app/shared/models/candidate.model';
import { ErrorModel } from 'src/app/shared/models/error.model';
import { messages } from 'src/app/shared/utils/constants/constants';
import { candidatesMock } from 'src/app/shared/utils/mocks/candidates.mock';
import { SubCollection } from 'src/app/shared/utils/rx/sub-collection';
import { CloneDataInDeep } from 'typescript-clone-data-in-deep';

@Component({
  selector: 'app-candidates-list',
  templateUrl: './candidates-list.component.html',
  styleUrls: ['./candidates-list.component.scss']
})
export class CandidatesListComponent implements OnInit, OnDestroy {

  candidates: Candidate[] | undefined;
  candidatesError: ErrorModel | undefined;

  subs = new SubCollection();

  constructor(
    public candidatesHandler: CandidatesHandler
  ) { }

  ngOnInit(): void {
    this.dispatchGetCandidates();
    this.getCandidates();
    this.getCandidatesError();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  dispatchGetCandidates(): void {
    this.candidatesHandler.loadCandidates();
  }

  getCandidates(): void {
    this.subs.add = this.candidatesHandler.getCandidates$.pipe(
      tap((candidates) => this.candidates = candidates)
    ).subscribe();
  }

  getCandidatesError(): void {
    this.subs.add = this.candidatesHandler.errorList$.subscribe(
      () => {
        this.candidatesError = { message: messages.candidates.getCandidatesError };
      }
    );
  }

  voteCandidate(voteInfo: {candidate: Candidate, voteType: string}): void {
    const {candidate, voteType} = voteInfo;
    const updatedCandidate = CloneDataInDeep.clone(candidate);
    const positiveVote: boolean = voteType === 'positive';
    const vote: Vote = {
      positiveVote,
      negativeVote: !positiveVote
    };
    updatedCandidate.votes?.push(vote);
    this.candidatesHandler.voteCandidate(updatedCandidate);
  }

}
