import { createFeatureSelector, createSelector, select, Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ObjectUtility } from '../../shared/utility/object-utility';
import { AppState } from './app.reducer';
import { appStoreKey } from './app-store.module';


// selectors
const getEntityState = createFeatureSelector<AppState>(appStoreKey);

const getAppState = createSelector(
    getEntityState,
    (state: AppState) => state
);

const getLoadingState = createSelector(
    getEntityState,
    (state: AppState) => state.loading
);

const getScrollingState = createSelector(
    getEntityState,
    (state: AppState) => state.scrollState
);
const getUrlAfterNavigationEnd = createSelector(
    getEntityState,
    (state: AppState) => state.url
);


@Injectable({ providedIn: 'root' })
export class AppSelectors {
    constructor(private store: Store) {
    }
    loadingState$ = this.store.pipe(select(getLoadingState), map(e => ObjectUtility.deepClone(e)));
    scrollState$ = this.store.pipe(select(getScrollingState), map(e => ObjectUtility.deepClone(e)));
    currentUrl$ = this.store.pipe(select(getUrlAfterNavigationEnd), map(e => ObjectUtility.deepClone(e)));
}
