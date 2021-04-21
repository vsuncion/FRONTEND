import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanesDeTrabajoNuevoComponent } from './planes-de-trabajo-nuevo.component';

describe('PlanesDeTrabajoNuevoComponent', () => {
  let component: PlanesDeTrabajoNuevoComponent;
  let fixture: ComponentFixture<PlanesDeTrabajoNuevoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanesDeTrabajoNuevoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanesDeTrabajoNuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
