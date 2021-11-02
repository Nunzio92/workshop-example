import { ComponentFactoryResolver, ComponentRef, Inject, Injectable, Injector } from '@angular/core';
import { MockWidgetComponent } from './widget/mock-widget.component';
import { AllKeyOfType, MappedMock, RequestMethods, RequestMethodType, SomeKeyOfType } from './utils/models';
import { MOCKS_GROUPS } from './mock-interceptor.module';


@Injectable()
export class MockService {
  mockEnable = true;
  myMock!: AllKeyOfType<RequestMethodType, MappedMock>;

  componentRef!: ComponentRef<MockWidgetComponent>;


  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private injector: Injector,
              @Inject(MOCKS_GROUPS) private mockGroups: SomeKeyOfType<RequestMethodType>[]) {
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

  init(enableWidget: boolean): void {
    this.myMock = MockService.mergeMockSmart(this.mockGroups);
    if (enableWidget){
      this.createWidget()
    }
  }

  createWidget(): void {
    // TODO COMPONENT INIT WITH WRAPPER COMPONENT
    // let container = document.createElement('ng-template');
    // document.body.appendChild(container);
    // const factory = this.componentFactoryResolver.resolveComponentFactory(WidgetRenderer);
    // factory.create(this.injector, [], container)

    // TODO DIRECT COMPONENT INITIALIZAZION
    let container = document.createElement('mock-widget') as any;
    const factory = this.componentFactoryResolver.resolveComponentFactory(MockWidgetComponent);
    this.componentRef = factory.create(this.injector, [], container);
    document.body.appendChild(container);



    // TODO with angular element is easy to create component befeor app init
    // const ComponentElement = createCustomElement(MockWidgetComponent, {injector: this.injector});
    // // Register the custom element with the browser.
    // customElements.define('mock-widget', ComponentElement);
    //
    // // Create element
    // const mockWidget: NgElement & WithProperties<MockWidgetComponent> =
    //   document.createElement('mock-widget') as any;
    // // Listen to the close event
    // mockWidget.addEventListener('closed', () => document.body.removeChild(mockWidget));
    // // Add to the DOM
    // document.body.appendChild(mockWidget);
  }
}
