export interface Celebrity {
  id: string;
  name: string;
  category: string;
  description: string;
  votes: Vote[];

}


export interface Vote {
  id: string;
  celebrity: Celebrity;
  positiveVote: boolean;
  negativeVote: boolean;
}
