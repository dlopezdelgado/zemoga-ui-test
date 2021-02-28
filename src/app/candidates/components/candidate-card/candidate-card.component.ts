import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Candidate } from 'src/app/shared/models/candidate.model';


export class CandidateCardBusinessLogic {


  static getTotalVotes(candidate: Candidate | undefined): number[] {
    if (!candidate || !candidate.votes || candidate.votes.length === 0) {
      return [0, 0];
    }

    const positiveVotes = candidate.votes.filter(vote => vote.positiveVote);
    const negativeVotes = candidate.votes.filter(vote => vote.negativeVote);


    return [positiveVotes.length, negativeVotes.length];
  }

  static calculateVotesPercentages(candidate: Candidate | undefined): number[] {
    if (!candidate || !candidate.votes || candidate.votes.length === 0) {
      return [0, 0];
    }

    const [positiveVotes, negativeVotes] = this.getTotalVotes(candidate);
    const totalVotes = positiveVotes + negativeVotes;

    const positivePerc = (positiveVotes * 100) / (totalVotes);
    const negativePerc = (negativeVotes * 100) / (totalVotes);

    return [positivePerc, negativePerc];
  }

}

@Component({
  selector: 'app-candidate-card',
  templateUrl: './candidate-card.component.html',
  styleUrls: ['./candidate-card.component.scss']
})
export class CandidateCardComponent implements OnInit {

  @Input() id: string | undefined;
  @Input() candidate: Candidate | undefined;

  @Output() voteClick = new EventEmitter();

  votesPercents: number[] = [0, 0];

  constructor() { }

  ngOnInit(): void {
    this.getVotesPercents();
  }

  vote(value: string): void {
    this.voteClick.emit({ candidate: this.candidate, voteType: value });
  }

  getVotesPercents(): void{
    this.votesPercents = CandidateCardBusinessLogic.calculateVotesPercentages(this.candidate);
  }


}
