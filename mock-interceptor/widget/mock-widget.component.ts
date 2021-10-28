import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { HttpMockService } from '../http-mock.service';
import { MOCKS_GROUPS } from '../mock-interceptor.module';
import { AllKeyOfType, SomeKeyOfType } from '../utils/typeTranformation.type';
import { HttpMockFactory, RequestMethodType } from '../http-mock-factory';
import { MappedMock } from '../utils/mock-group';

@Component({
  selector: 'mock-widget',
  templateUrl: './mock-widget.component.html',
  styleUrls: ['./mock-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MockWidgetComponent implements OnInit {
  activeAccordionIndex = 0;
  isOpen = false;

  constructor(public mockWidgetService: HttpMockService,
              @Inject(MOCKS_GROUPS) public mockGroups: SomeKeyOfType<RequestMethodType, MappedMock>[]) {
  }

  ngOnInit(): void {
  }


  extractEnable(source: any, prop1: string, prop2: string, prop3: string) {
    return source?.[prop1]?.[prop2]?.[prop3]
  }

  changeStatus(key: RequestMethodType, key2: string, $event: any) {
    if (!!this.mockWidgetService.myMock?.[key]?.[key2]) {
      this.mockWidgetService.myMock[key][key2].enabled = $event;
    }
  }
}
