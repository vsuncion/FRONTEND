import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendariosNuevoComponent } from './calendarios-nuevo.component';

describe('CalendariosNuevoComponent', () => {
  let component: CalendariosNuevoComponent;
  let fixture: ComponentFixture<CalendariosNuevoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendariosNuevoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendariosNuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
