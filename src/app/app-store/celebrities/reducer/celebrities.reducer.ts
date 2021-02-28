
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createFeatureSelector, createReducer, on } from '@ngrx/store';
import { Celebrity } from 'src/app/shared/models/celebrity.model';


import * as CelebritiesActions from '../actions/celebrities.actions';


export interface CelebrityState extends EntityState<Celebrity> {
  loadingCelebrities: boolean;
  loadingVote: boolean;
}

export const celebritiesFeatureKey = 'celebrities';
export const celebrityFeatureSelector = createFeatureSelector<CelebrityState>(celebritiesFeatureKey);

export const celebrityAdapter: EntityAdapter<Celebrity> = createEntityAdapter<Celebrity>({
  selectId: (celebrity: Celebrity) => celebrity.id,
  // sortComparer: (a: Celebrity, b: Celebrity) => a.name.localeCompare(b.name)
});

export const celebrityInitialState: CelebrityState = celebrityAdapter.getInitialState({
  loadingCelebrities: false,
  loadingVote: false
});


export const reducer = createReducer(
  celebrityInitialState,
  on(CelebritiesActions.getAllCelebrities, (state) => ({ ...state, loadingCelebrities: true })),
  on(CelebritiesActions.getAllCelebritiesSuccess, (state, { celebrities }) => celebrityAdapter.setAll(celebrities, {
    ...state,
    loadingCelebrities: false
  })),
  on(CelebritiesActions.getAllCelebritiesFail, (state) => ({ ...state, loadingCelebrities: false })),

  on(CelebritiesActions.voteCelebrity, (state) => ({ ...state, loadingVote: true })),
  on(CelebritiesActions.voteCelebritySuccess, (state, { celebrity }) => celebrityAdapter.updateOne(celebrity, {
    ...state,
    loadingVote: false
  })),
  on(CelebritiesActions.voteCelebrityFail, (state) => ({ ...state, loadingVote: false })),

);
