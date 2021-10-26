import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpMockFactory, RequestMethodType } from './http-mock-factory';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MockWidgetComponent } from './widget/mock-widget.component';
import { MockWidgetService } from './widget/mock-widget.service';
import { ReactiveComponentModule } from '@ngrx/component';
import { FormsModule } from '@angular/forms';
import { ADVANCEDGUSIMPORTMOCK } from './mocks/advanced-gus-import.mock';
import { MOCKFEEDBACK } from './mocks/feedback-prodotto.mock';
import { QUESTIONARIPRODOTTOMOCK } from './mocks/questionari-prodotto.mock';
import { SomeKeyOfType } from './utils/typeTranformation.type';
import { ExtractNonEnumerable, KeyValuePipe, TuiMapperPipe } from './utils/keyValue.pipe';
import { MappedMock } from './utils/mock-group';

export const MOCKS_GROUPS = new InjectionToken<SomeKeyOfType<RequestMethodType, MappedMock>[]>(
  'Array of Mock constant created with createMockGroup()',
  {
    factory: () => ([]),
  },
);


@NgModule({
  imports: [
    CommonModule,
    ReactiveComponentModule,
    FormsModule,
  ],
  declarations: [
    MockWidgetComponent,
    KeyValuePipe,
    ExtractNonEnumerable,
    TuiMapperPipe
  ],
  exports: [
    MockWidgetComponent
  ],
  providers: [
    {
      provide: MOCKS_GROUPS,
      useValue: [ADVANCEDGUSIMPORTMOCK, MOCKFEEDBACK, QUESTIONARIPRODOTTOMOCK]
    }
  ]
})
export class MockInterceptorModule {

  static forRoot() {
    return {
      ngModule: MockInterceptorModule,
      providers: [
        {provide: HTTP_INTERCEPTORS, useClass: HttpMockFactory, multi: true},
      ],
    };
  }

}