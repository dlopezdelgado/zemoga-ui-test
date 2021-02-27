import { Store } from '@ngrx/store';
import { createCelebrity } from 'src/app/app-store/celebrities/actions/celebrities.actions';
import { Celebrity } from '../../models/celebrity.model';

export const createCelebritiesForTesting = (celebrities: Celebrity[], store$: Store) => {
  celebrities.forEach((celebrity: Celebrity) => {
    const createCelebrityAction = createCelebrity({ celebrity });
    store$.dispatch(createCelebrityAction);
  });
};

