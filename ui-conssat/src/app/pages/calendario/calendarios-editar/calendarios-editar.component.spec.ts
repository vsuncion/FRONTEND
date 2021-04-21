import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendariosEditarComponent } from './calendarios-editar.component';

describe('CalendariosEditarComponent', () => {
  let component: CalendariosEditarComponent;
  let fixture: ComponentFixture<CalendariosEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendariosEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendariosEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
