import { Action, createReducer, on } from '@ngrx/store';
import { getModel1, getModel1Success } from './feature1.action';
import { immerOn } from 'ngrx-immer/store';

export interface Model1{
  nome: string,
  cognome: string,
  indirizzo: string,
  cap: number
}

export interface Feature1State {
    model1: Model1 [] | null;
}

export const initialState: Feature1State = {
   model1: null
};

const feature1Reducer = createReducer(initialState,
    immerOn(getModel1Success, (state, {model1}) => {state.model1 = model1}),
    on(getModel1Success, (state, {model1}) => ({...state, model1: model1})),
);


export function reducer(state: Feature1State | undefined, action: Action) {
    return feature1Reducer(state, action);
}

