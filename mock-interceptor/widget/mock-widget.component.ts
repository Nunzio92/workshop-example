import {
  ApplicationRef,
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  Inject,
  OnInit,
  ViewRef
} from '@angular/core';
import { MockService } from '../mock.service';
import { MOCKS_GROUPS } from '../mock-interceptor.module';
import { MappedMock, RequestMethodType, SomeKeyOfType } from '../utils/models';

@Component({
  selector: 'mock-widget',
  templateUrl: './mock-widget.component.html',
  styleUrls: ['./mock-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MockWidgetComponent implements OnInit {
  activeAccordionIndex = 0;
  isOpen = false;

  constructor(public mockWidgetService: MockService,
              private appRef: ApplicationRef,
              @Inject(MOCKS_GROUPS) public mockGroups: SomeKeyOfType<RequestMethodType, MappedMock>[]) {
    setTimeout( () => {
      this.appRef.attachView(this.mockWidgetService.componentRef.hostView);
    })
  }

  ngOnInit(): void {
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
