import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpMockFactory } from './http-mock-factory';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MockWidgetComponent } from './widget/mock-widget.component';
import { MockWidgetService } from './widget/mock-widget.service';
import { ReactiveComponentModule } from '@ngrx/component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveComponentModule,
    FormsModule,
  ],
  declarations: [
    MockWidgetComponent
  ],
  exports: [
    MockWidgetComponent
  ]
})
export class MockInterceptorModule {
  constructor(private widgetCreatorService : MockWidgetService) {
  this.widgetCreatorService.createWizard();
  }

  static forRoot() {
    return {
      ngModule: MockInterceptorModule,
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: HttpMockFactory, multi: true },
      ],
    };
  }

}
