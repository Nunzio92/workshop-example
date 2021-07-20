import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { Feature1Effects } from './feature1.effects';
import * as feature1Reducer from './feature1.reducer';
import { Feature1Selectors } from './feature1.selector';
import { feature1Key } from './index';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(feature1Key, feature1Reducer.reducer),
    EffectsModule.forFeature([Feature1Effects]),
  ],
  providers: [
    Feature1Selectors
  ],
  exports: []
})
export class Feature1StoreModule {
}
