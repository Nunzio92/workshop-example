import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MockWidgetComponent } from './mock-widget.component';

describe('WidgetComponent', () => {
  let component: MockWidgetComponent;
  let fixture: ComponentFixture<MockWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MockWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MockWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
