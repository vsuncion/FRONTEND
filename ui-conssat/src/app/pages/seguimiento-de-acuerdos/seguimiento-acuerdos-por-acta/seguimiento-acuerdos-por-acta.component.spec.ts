import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeguimientoAcuerdosPorActaComponent } from './seguimiento-acuerdos-por-acta.component';

describe('SeguimientoAcuerdosPorActaComponent', () => {
  let component: SeguimientoAcuerdosPorActaComponent;
  let fixture: ComponentFixture<SeguimientoAcuerdosPorActaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeguimientoAcuerdosPorActaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeguimientoAcuerdosPorActaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
