import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MockWidgetService } from './mock-widget.service';
import { MOCKS_GROUPS } from '../mock-interceptor.module';
import { SomeKeyOfType } from '../utils/typeTranformation.type';
import { RequestMethodType } from '../http-mock-factory';
import { MappedMock } from '../utils/mock-group';

@Component({
  selector: 'mock-widget',
  templateUrl: './mock-widget.component.html',
  styleUrls: ['./mock-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MockWidgetComponent implements OnInit {
  constructor(public mockWidgetService: MockWidgetService,
              @Inject(MOCKS_GROUPS) public mockGroups: SomeKeyOfType<RequestMethodType, MappedMock>[]) {
  }

  ngOnInit(): void {
  }


  extractEnable(source: any, prop1: string, prop2: string, prop3: string) {
    return source?.[prop1]?.[prop2]?.[prop3]
  }

  changeStatus(key: RequestMethodType, key2: string, $event: any) {
    if (!!this.mockWidgetService.mocksList?.[key]?.[key2]?.enabled) {
      this.mockWidgetService.mocksList[key][key2].enabled = $event;
    }
  }
}
