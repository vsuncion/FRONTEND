import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SesionesDeTrabajoNuevoComponent } from './sesiones-de-trabajo-nuevo.component';

describe('SesionesDeTrabajoNuevoComponent', () => {
  let component: SesionesDeTrabajoNuevoComponent;
  let fixture: ComponentFixture<SesionesDeTrabajoNuevoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SesionesDeTrabajoNuevoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SesionesDeTrabajoNuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
