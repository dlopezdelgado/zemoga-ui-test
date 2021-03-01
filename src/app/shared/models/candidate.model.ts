export interface Candidate {
  _id: string;
  name: string;
  image: string;
  category: string;
  description: string;
  votes?: Vote[];
  enableVoting?: boolean;

}


export interface Vote {
  positiveVote: boolean;
  negativeVote: boolean;
  voteDate?: Date;
}
