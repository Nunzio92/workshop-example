import { Injectable, Injector } from '@angular/core';
import { createCustomElement, NgElement, WithProperties } from '@angular/elements';
import { MockWidgetComponent } from './mock-widget.component';
import { AllKeyOfType, SomeKeyOfType } from '../utils/typeTranformation.type';
import { RequestMethodType } from '../http-mock-factory';
import { MappedMock } from '../utils/mock-group';


@Injectable({
  providedIn: 'root',
})
export class MockWidgetService {
  mocksList!: AllKeyOfType<RequestMethodType, MappedMock>;
  mockEnable = true;

  constructor(private injector: Injector) {
    const ComponentElement = createCustomElement(MockWidgetComponent, {injector});
    // Register the custom element with the browser.
    customElements.define('mock-widget', ComponentElement);
  }

  initMockList(mocksList: AllKeyOfType<RequestMethodType, MappedMock>) {
    this.mocksList = mocksList;
    this.createWizard();
  }


  createWizard() {
    // Create element
    const mockWidget: NgElement & WithProperties<MockWidgetComponent> =
      document.createElement('mock-widget') as any;
    // Listen to the close event
    mockWidget.addEventListener('closed', () => document.body.removeChild(mockWidget));
    // Add to the DOM
    document.body.appendChild(mockWidget);
  }
}
