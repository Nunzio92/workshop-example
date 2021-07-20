import { createAction, props } from '@ngrx/store';
import { Model1 } from './feature1.reducer';


// <------------------------ NATIVE ACTION SCROLLING ---------------------------------->
export const getModel1 = createAction(
    '[Feature1] GET_MODEL1'
);
export const getModel1Success = createAction(
  '[Feature1] GET_MODEL1_SUCCESS',
  props<{ model1: Model1[] }>()
);

export const getModel1Error = createAction(
  '[Feature1] GET_MODEL1_ERROR',
);

