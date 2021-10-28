import { Inject, Injectable, Injector } from '@angular/core';
import { createCustomElement, NgElement, WithProperties } from '@angular/elements';
import { MockWidgetComponent } from './widget/mock-widget.component';
import { AllKeyOfType, MappedMock, RequestMethods, RequestMethodType, SomeKeyOfType } from './utils/models';
import { MOCKS_GROUPS } from './mock-interceptor.module';


@Injectable({
  providedIn: 'root',
})
export class HttpMockService {
  mockEnable = true;
  myMock!: AllKeyOfType<RequestMethodType, MappedMock>;


  constructor(private injector: Injector, @Inject(MOCKS_GROUPS) private mockGroups: SomeKeyOfType<RequestMethodType>[]) {
    if (mockGroups.length === 0) {
      throw new Error('MockInterceptor is enabled but no mocks are provided! Inject some mock through MOCKS_GROUPS token.');
    }
  }

  // Merge all mock files and generate a smaller structure that contains all mocks url divided for RequestMethods
  private static mergeMockSmart(mockGroups: SomeKeyOfType<RequestMethodType, MappedMock>[]): AllKeyOfType<RequestMethodType, MappedMock> {
    return mockGroups.reduce((accumulator, currentValue) => {
      (Object.keys(RequestMethods) as RequestMethodType[]).forEach(v => {
        accumulator = {...accumulator, [v]: {...accumulator[v], ...currentValue[v]}};
      });
      return accumulator;
    }) as AllKeyOfType<RequestMethodType, MappedMock>;
  }

  init(): void {
    this.myMock = HttpMockService.mergeMockSmart(this.mockGroups);
    this.createWidget()
  }

  createWidget(): void {
    const ComponentElement = createCustomElement(MockWidgetComponent, {injector: this.injector});
    // Register the custom element with the browser.
    customElements.define('mock-widget', ComponentElement);

    // Create element
    const mockWidget: NgElement & WithProperties<MockWidgetComponent> =
      document.createElement('mock-widget') as any;
    // Listen to the close event
    mockWidget.addEventListener('closed', () => document.body.removeChild(mockWidget));
    // Add to the DOM
    document.body.appendChild(mockWidget);
  }
}
