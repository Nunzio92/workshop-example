import { Injectable, Injector } from '@angular/core';
import { createCustomElement, NgElement, WithProperties } from '@angular/elements';
import { MockWidgetComponent } from './mock-widget.component';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MockWidgetService {
  private _mockSubject= new BehaviorSubject<boolean>(true);

  constructor(private injector: Injector) {
    const ComponentElement = createCustomElement(MockWidgetComponent, { injector });
    // Register the custom element with the browser.
    customElements.define('mock-widget', ComponentElement);
  }

  get mockStatus$(){
    return this._mockSubject.asObservable();
  }
  changeMockStatus(newStatus: boolean){
    this._mockSubject.next(newStatus);
  }

  createWizard() {

    // Create element
    const mockWidget: NgElement & WithProperties<MockWidgetComponent> =
      document.createElement('mock-widget') as any;

    console.log(mockWidget);
    // Listen to the close event
    mockWidget.addEventListener('closed', () => document.body.removeChild(mockWidget));

    // Add to the DOM
    document.body.appendChild(mockWidget);

  }
}
