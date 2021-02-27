import { createAction, props } from "@ngrx/store";
import { Celebrity } from "src/app/shared/models/celebrity.model";
import { ErrorModel } from "src/app/shared/models/error.model";

export const getAllCelebrities = createAction('[Celebrities] Get All Celebrities');
export const getAllCelebritiesSuccess = createAction(
  '[Celebrities] Get All Celebrities Success', 
  props<{ celebrities: Celebrity[] }>()
);
export const getAllCelebritiesFail = createAction(
  '[Celebrities] Get All Celebrities Fail', 
  props<{ error: ErrorModel }>()
);


export const createCelebrity = createAction('[Celebrities] Create Celebrity', props<{ celebrity: Celebrity }>());
export const createCelebritySuccess = createAction('[Celebrities] Create Celebrity Success', props<{ celebrity: Celebrity | undefined }>());
export const createCelebrityFail = createAction('[Celebrities] Create Celebrity Fail', props<{ error: ErrorModel }>());