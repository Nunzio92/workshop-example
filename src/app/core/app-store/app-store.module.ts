import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './app.effects';
import * as appReducer from './app.reducer';

export const appStoreKey = 'appState';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(appStoreKey, appReducer.reducer),
    EffectsModule.forFeature([AppEffects]),
  ],
  providers: [
  ],
  exports: []
})
export class AppStoreModule {
}
