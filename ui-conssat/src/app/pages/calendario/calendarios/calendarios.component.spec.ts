import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendariosComponent } from './calendarios.component';

describe('CalendariosComponent', () => {
  let component: CalendariosComponent;
  let fixture: ComponentFixture<CalendariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
