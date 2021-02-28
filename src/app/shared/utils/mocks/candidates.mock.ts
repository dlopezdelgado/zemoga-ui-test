import { Candidate } from '../../models/candidate.model';
import { votesMock } from './votes.mock';


export const candidatesMock: Candidate[] = [
  {
    _id: '1',
    name: 'Kanye West',
    image: '/assets/images/candidates/01-kanye-west.jpg',
    description: 'Vestibulum diam ante, porttitor a odio eget, rhoncus neque. Aenean eu velit libero.',
    category: 'Entertainment',
    votes: [votesMock[0], votesMock[1], votesMock[0]]
  },
  {
    _id: '2',
    name: 'Mark Zuckerberg',
    image: '/assets/images/candidates/02-mark-zuckerberg.jpg',
    description: 'Vestibulum diam ante, porttitor a odio eget, rhoncus neque. Aenean eu velit libero.',
    category: 'Business',
    votes: [votesMock[0], votesMock[1], votesMock[0], votesMock[1]]
  },
  {
    _id: '3',
    name: 'Cristina Fernández de Kirchner',
    image: '/assets/images/candidates/03-cristina-fernandez.jpg',
    description: 'Vestibulum diam ante, porttitor a odio eget, rhoncus neque. Aenean eu velit libero.',
    category: 'Politics',
    votes: [votesMock[0], votesMock[1], votesMock[1]]
  },
  {
    _id: '4',
    name: 'Malala Yousafzai',
    image: '/assets/images/candidates/04-malala-yousafzai.jpg',
    description: 'Vestibulum diam ante, porttitor a odio eget, rhoncus neque. Aenean eu velit libero.',
    category: 'Entertainment',
    votes: [votesMock[0], votesMock[1]]
  }
];
