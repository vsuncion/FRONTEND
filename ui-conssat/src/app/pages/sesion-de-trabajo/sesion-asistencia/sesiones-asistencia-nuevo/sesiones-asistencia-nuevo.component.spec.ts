import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SesionesAsistenciaNuevoComponent } from './sesiones-asistencia-nuevo.component';

describe('SesionesAsistenciaNuevoComponent', () => {
  let component: SesionesAsistenciaNuevoComponent;
  let fixture: ComponentFixture<SesionesAsistenciaNuevoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SesionesAsistenciaNuevoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SesionesAsistenciaNuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
