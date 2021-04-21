import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanesDeTrabajoEditarComponent } from './planes-de-trabajo-editar.component';

describe('PlanesDeTrabajoEditarComponent', () => {
  let component: PlanesDeTrabajoEditarComponent;
  let fixture: ComponentFixture<PlanesDeTrabajoEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanesDeTrabajoEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanesDeTrabajoEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
