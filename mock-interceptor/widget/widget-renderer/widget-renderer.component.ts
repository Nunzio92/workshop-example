import { ApplicationRef, Component, ComponentFactoryResolver, Injector, ViewContainerRef } from '@angular/core';
import { MockWidgetComponent } from '../mock-widget.component';

@Component({
  template: '',
})
export class WidgetRenderer {
  constructor(private appRef: ApplicationRef,
              private viewRef: ViewContainerRef,
              private injector: Injector,
              private componentFactoryResolver: ComponentFactoryResolver) {
    let container = document.createElement('mock-widget') as any;
    document.body.appendChild(container);
    const factory = this.componentFactoryResolver.resolveComponentFactory(MockWidgetComponent);
    const component = factory.create(this.injector, [], container)

    this.appRef.attachView(component.hostView)
  }
}
