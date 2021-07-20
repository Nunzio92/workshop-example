import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { auditTime, concatMap, filter, map, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { fromEvent } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { errorThrowing, navigationEnd, scrollDown, scrollUp } from './app.action';


@Injectable()
export class AppEffects {
    // molto importante l'overload dell' oftype oltre i 5 tipi di action è il seguente: ofType(...[login.type, pippo.type])

    private tempYOffset= 0

    scrollEvent$ = createEffect(() =>
        fromEvent(document, 'scroll').pipe(
            // debounceTime(500),
            auditTime(300),
            map(_ => {
                return this.tempYOffset > window.pageYOffset ? (scrollUp({yOffset: window.pageYOffset}))
                    : (scrollDown({yOffset: window.pageYOffset}));
            }),
            tap(_ => this.tempYOffset = window.pageYOffset)
        ));

    navigationEnd$ = createEffect(() =>
        this.router.events
            .pipe(
                filter(event => event instanceof NavigationEnd),
                map(event => event as NavigationEnd),
                map((event: NavigationEnd) => {
                    return navigationEnd({url: event.urlAfterRedirects});
                }),
            )
    );

    // nomeEffect$= createEffect(
    //   () => this.actions$.pipe(
    //     ofType(action1,action2),
    //     // can add more pipable operator
    //     concatMap(action =>{
    //       if (action.type === action1.type){
    //         // do http request and return action
    //       } else if(action.type === action2.type) {
    //         // return observable of action
    //       }
    //     }),
    //     tap(_ => console.log('lo stream funziona!'))
    //   ), {dispatch: true || false}
    // )






    constructor(private actions$: Actions,
                private store: Store,
                private router: Router,
    ) {

    }

}



