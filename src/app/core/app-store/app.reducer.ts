import { Action, createReducer, on } from '@ngrx/store';
import { navigationEnd, scrollDown, scrollUp, startLoading, stopLoading } from './app.action';

export interface ScrollState {
    isScrollingUp: boolean;
    yOffset: number;
}

export interface AppState {
    scrollState: ScrollState;
    // app is loading something
    loading: boolean;
    url: string;
}

export const initialState: AppState = {
    scrollState: {
        isScrollingUp: false,
        yOffset: 0
    },
    loading: false,
    url: '',
};

const appReducer = createReducer(initialState,
    on(scrollUp, (state, {yOffset}) => ({...state, scrollState: {...state.scrollState, yOffset, isScrollingUp: true}})),
    on(scrollDown, (state, {yOffset}) => ({...state, scrollState: {...state.scrollState, yOffset, isScrollingUp: false}})),
    on(startLoading, (state) => ({...state, loading: true})),
    on(stopLoading, (state) => ({...state, loading: false})),
    on(navigationEnd, (state, {url}) => ({...state, url})),
);


export function reducer(state: AppState | undefined, action: Action) {
    return appReducer(state, action);
}

