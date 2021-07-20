import { createFeatureSelector, createSelector, select, Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { ObjectUtility } from '../../../shared/utility/object-utility';
import { Feature1State } from './feature1.reducer';
import { feature1Key } from './index';


// selectors
const getEntityState = createFeatureSelector<Feature1State>(feature1Key);

const getModel1 = createSelector(
  getEntityState,
  (state: Feature1State) => state.model1
);


@Injectable()
export class Feature1Selectors {
    constructor(private store: Store) {
    }
  model1$ = this.store.pipe(select(getModel1), map(e => ObjectUtility.deepClone(e)));
}
