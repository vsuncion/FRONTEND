import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendariosVerComponent } from './calendarios-ver.component';

describe('CalendariosVerComponent', () => {
  let component: CalendariosVerComponent;
  let fixture: ComponentFixture<CalendariosVerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendariosVerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendariosVerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
