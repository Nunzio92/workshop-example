import { Component, OnInit } from '@angular/core';
import { MockWidgetService } from './mock-widget.service';

@Component({
  selector: 'mock-widget',
  templateUrl: './mock-widget.component.html',
  styleUrls: ['./mock-widget.component.scss']
})
export class MockWidgetComponent implements OnInit {
mockStatus$ = this.mockWidgetService.mockStatus$
  constructor(private mockWidgetService: MockWidgetService) { }

  ngOnInit(): void {
  }

}
