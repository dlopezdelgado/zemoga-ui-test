import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Celebrity } from 'src/app/shared/models/celebrity.model';


export class CelebrityCardBusinessLogic {


  static getTotalVotes(celebrity: Celebrity | undefined): number[] {
    if (!celebrity || !celebrity.votes || celebrity.votes.length === 0) {
      return [0, 0];
    }

    const positiveVotes = celebrity.votes.filter(vote => vote.positiveVote);
    const negativeVotes = celebrity.votes.filter(vote => vote.negativeVote);


    return [positiveVotes.length, negativeVotes.length];
  }

  static calculateVotesPercentages(celebrity: Celebrity | undefined): number[] {
    if (!celebrity || !celebrity.votes || celebrity.votes.length === 0) {
      return [0, 0];
    }

    const [positiveVotes, negativeVotes] = this.getTotalVotes(celebrity);
    const totalVotes = positiveVotes + negativeVotes;

    const positivePerc = (positiveVotes * 100) / (totalVotes);
    const negativePerc = (negativeVotes * 100) / (totalVotes);

    return [positivePerc, negativePerc];
  }

}

@Component({
  selector: 'app-celebrity-card',
  templateUrl: './celebrity-card.component.html',
  styleUrls: ['./celebrity-card.component.scss']
})
export class CelebrityCardComponent implements OnInit {

  @Input() id: string | undefined;
  @Input() celebrity: Celebrity | undefined;

  @Output() voteClick = new EventEmitter();

  votesPercents: number[] = [0, 0];

  constructor() { }

  ngOnInit(): void {
    this.getVotesPercents();
  }

  vote(value: string): void {
    this.voteClick.emit({ celebrity: this.celebrity, voteType: value });
  }

  getVotesPercents(): void{
    this.votesPercents = CelebrityCardBusinessLogic.calculateVotesPercentages(this.celebrity);
  }


}
