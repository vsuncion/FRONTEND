import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanesDeTrabajoVerComponent } from './planes-de-trabajo-ver.component';

describe('PlanesDeTrabajoVerComponent', () => {
  let component: PlanesDeTrabajoVerComponent;
  let fixture: ComponentFixture<PlanesDeTrabajoVerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanesDeTrabajoVerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanesDeTrabajoVerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
