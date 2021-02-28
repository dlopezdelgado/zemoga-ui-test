import { Celebrity } from '../../models/celebrity.model';
import { votesMock } from './votes.mock';


export const celebritiesMock: Celebrity[] = [
  {
    id: '1',
    name: 'Kanye West',
    image: '/assets/images/celebrities/01-kanye-west.jpg',
    description: 'Vestibulum diam ante, porttitor a odio eget, rhoncus neque. Aenean eu velit libero.',
    category: 'Entertainment',
    votes: [votesMock[0], votesMock[1], votesMock[0]]
  },
  {
    id: '2',
    name: 'Mark Zuckerberg',
    image: '/assets/images/celebrities/02-mark-zuckerberg.jpg',
    description: 'Vestibulum diam ante, porttitor a odio eget, rhoncus neque. Aenean eu velit libero.',
    category: 'Business',
    votes: [votesMock[0], votesMock[1], votesMock[0], votesMock[1]]
  },
  {
    id: '3',
    name: 'Cristina Fernández de Kirchner',
    image: '/assets/images/celebrities/03-cristina-fernandez.jpg',
    description: 'Vestibulum diam ante, porttitor a odio eget, rhoncus neque. Aenean eu velit libero.',
    category: 'Politics',
    votes: [votesMock[0], votesMock[1], votesMock[1]]
  },
  {
    id: '4',
    name: 'Malala Yousafzai',
    image: '/assets/images/celebrities/04-malala-yousafzai.jpg',
    description: 'Vestibulum diam ante, porttitor a odio eget, rhoncus neque. Aenean eu velit libero.',
    category: 'Entertainment',
    votes: [votesMock[0], votesMock[1]]
  }
];
