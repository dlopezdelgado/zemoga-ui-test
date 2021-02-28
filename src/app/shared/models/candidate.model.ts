export interface Candidate {
  id: string;
  name: string;
  image: string;
  category: string;
  description: string;
  votes?: Vote[];

}


export interface Vote {
  id?: string;
  positiveVote: boolean;
  negativeVote: boolean;
  voteDate?: Date;
}
