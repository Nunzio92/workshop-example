import {
  ApplicationRef,
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  Inject, NgZone,
  OnInit,
  ViewRef
} from '@angular/core';
import { MockService } from '../mock.service';
import { MOCKS_GROUPS } from '../mock-interceptor.module';
import { MappedMock, RequestMethodType, SomeKeyOfType } from '../utils/models';
import { take } from 'rxjs/operators';

@Component({
  selector: 'mock-widget',
  templateUrl: './mock-widget.component.html',
  styleUrls: ['./mock-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MockWidgetComponent {
  activeAccordionIndex = 0;
  isOpen = false;

  constructor(public mockWidgetService: MockService,
              private appRef: ApplicationRef,
              private zone: NgZone,
              @Inject(MOCKS_GROUPS) public mockGroups: SomeKeyOfType<RequestMethodType, MappedMock>[]) {

    // attach view when zone tasks are empty
    zone.onStable.pipe(take(1)).subscribe(_ => {
      this.appRef.attachView(this.mockWidgetService.componentRef.hostView);
    });
  }


  extractEnable(source: any, prop1: string, prop2: string, prop3: string): boolean {
    return source?.[prop1]?.[prop2]?.[prop3]
  }

  changeStatus(key: RequestMethodType, key2: string, $event: any): void {
    if (!!this.mockWidgetService.myMock?.[key]?.[key2]) {
      this.mockWidgetService.myMock[key][key2].enabled = $event;
    }
  }
}
