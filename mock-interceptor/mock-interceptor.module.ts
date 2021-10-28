import { APP_INITIALIZER, InjectionToken, ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpMockFactory } from './http-mock-factory';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MockWidgetComponent } from './widget/mock-widget.component';
import { HttpMockService } from './http-mock.service';
import { FormsModule } from '@angular/forms';
import { MappedMock, RequestMethodType, SomeKeyOfType } from './utils/models';
import { ExtractNonEnumerable, KeyValuePipe, MapperPipe } from './utils/pipes.pipe';
import { throwIfAlreadyLoaded } from './utils/module-import-guard';

export const MOCKS_GROUPS = new InjectionToken<SomeKeyOfType<RequestMethodType, MappedMock>[]>(
  'Array of Mock constant created with createMockGroup()',
  {
    factory: () => ([]),
  },
);

export function httpMockInit(httpMockService: HttpMockService) { // aot dosen't support arrow funciton
  return () => httpMockService.init();
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [
    MockWidgetComponent,
    KeyValuePipe,
    ExtractNonEnumerable,
    MapperPipe
  ],
  exports: [
    MockWidgetComponent
  ]
})
export class MockInterceptorModule {
  constructor(@Optional() @SkipSelf() parentModule: MockInterceptorModule) {
    throwIfAlreadyLoaded(parentModule, 'MockInterceptorModule');
  }

  static forRoot(mocksGroups: SomeKeyOfType<RequestMethodType, MappedMock>[]): ModuleWithProviders<MockInterceptorModule> {
    return {
      ngModule: MockInterceptorModule,
      providers: [
        {provide: APP_INITIALIZER, multi: true, useFactory: httpMockInit, deps: [HttpMockService]},
        {provide: HTTP_INTERCEPTORS, useClass: HttpMockFactory, multi: true},
        {provide: MOCKS_GROUPS, useValue: mocksGroups}
      ],
    };
  }

}

