import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { catchError, delay, exhaustMap, map } from 'rxjs/operators';
import { getModel1, getModel1Error, getModel1Success } from './feature1.action';
import { Feature1Service } from '../services/feature1.service';
import { EMPTY, of } from 'rxjs';
import { startLoading, stopLoading } from '../../../core/app-store/app.action';
import { Feature1Selectors } from './feature1.selector';


@Injectable()
export class Feature1Effects {

  // concatMap(action => of(action).pipe(
  //   withLatestFrom(this.store.select(fromBooks.getCollectionBookIds))
  // )), => sostituito dall'operatore concatLatestFrom
  // Note: For performance reasons, use a flattening operator in combination with withLatestFrom to prevent the selector from firing until the correct action is dispatched.
  // https://github.com/ngrx/platform/blob/55f0f7ac3f48e87821d4706bd57542a836f309dc/modules/effects/src/concat_latest_from.ts

  getModel1$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getModel1),
      concatLatestFrom(_ => this.feature1Selector.model1$),
      exhaustMap(([action, model1]) => {
          if (!!model1 && model1.length > 0) {
            return of(getModel1Success({model1: model1}));
          } else {
            return this.feature1Service.getModel1().pipe(
              delay(500),
              map(res => {
                if (!!res) {
                  return getModel1Success({model1: res})
                }
                return getModel1Error()
              }),
              catchError(() => EMPTY)
            )
          }
        }
      )
    ));

  errors$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getModel1Error),
      map(action =>
        console.log('errore action:' + action.type)
      )
    ), {dispatch: false});

  startLoading$ = createEffect(() =>
    this.actions$.pipe(
      ofType(...[getModel1]),
      map(_ => startLoading())
    ));

  stopLoading$ = createEffect(() =>
    this.actions$.pipe(
      ofType(...[getModel1Success, getModel1Error]),
      map(_ => stopLoading())
    ));


  constructor(private actions$: Actions,
              private feature1Selector: Feature1Selectors,
              private feature1Service: Feature1Service) {
  }

}



