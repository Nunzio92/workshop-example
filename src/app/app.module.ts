import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { Action, State, StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { PageNotFoundComponent } from './page-not-found.component';
import { environment } from '../environments/environment';
import { devDep } from '../../mock-interceptor';


export function actionSanitizer(action: Action) {
  // if (action.type === navigationEnd.type  ){
  //   return sanitizedNavigationEnd({url: 'is a secret shhhh!'});
  // }
  // return action;

  // if you wanna hide all actions payload and still wanna trace action name from debug tool
  return {type: 'PROD ' + action.type};
}
export function stateSanitizer(state: State<any>) {
  // let res = {...state, appState:{...(state as any).appState, url: 'sorry you can\'t read this'} }
  // return res;
  // return  state;
  // if you wanna hide the store
  return {};
}

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    StoreModule.forRoot({}, {
        runtimeChecks: {
          strictStateImmutability: true,
          strictActionImmutability: true,
          strictStateSerializability: true,
          strictActionSerializability: true,
        },
        // initialState: () => mock
      }
    ),
    EffectsModule.forRoot(),
    StoreDevtoolsModule.instrument({
      name: 'workshop',
      maxAge: 35, // Retains last 35 states
      actionsBlocklist: ['[NATIVE_ACTION] SCROLL_UP', '[NATIVE_ACTION] SCROLL_DOWN'], // or just [NATIVE_ACTION] to omit both
      logOnly: environment.production,
      stateSanitizer: stateSanitizer,
      actionSanitizer: actionSanitizer, // aot doesn't support arrow function! <===!!!
      // features:{
      //   pause: true, // start/pause recording of dispatched actions
      //   lock: true, // lock/unlock dispatching actions and side effects
      //   persist: true, // persist states on page reloading
      //   export: true, // export history of actions in a file
      //   import: 'custom', // import history of actions from a file
      //   jump: true, // jump back and forth (time travelling)
      //   skip: true, // skip (cancel) actions
      //   reorder: true, // drag and drop actions in the history list
      //   dispatch: true, // dispatch custom actions or action creators
      // },
    }),
    ...devDep
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
