import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { Celebrity, Vote } from 'src/app/shared/models/celebrity.model';
import { ErrorModel } from 'src/app/shared/models/error.model';

export const getAllCelebrities = createAction('[Celebrities] Get All Celebrities');
export const getAllCelebritiesSuccess = createAction(
  '[Celebrities] Get All Celebrities Success',
  props<{ celebrities: Celebrity[] }>()
);
export const getAllCelebritiesFail = createAction(
  '[Celebrities] Get All Celebrities Fail',
  props<{ error: ErrorModel }>()
);


export const voteCelebrity = createAction('[Celebrities] Vote Celebrity', props<{ celebrity: Celebrity }>());
export const voteCelebritySuccess = createAction('[Celebrities] Vote Celebrity Success', props<{ celebrity: Update<Celebrity> }>());
export const voteCelebrityFail = createAction('[Celebrities] Vote Celebrity Fail', props<{ error: ErrorModel }>());
