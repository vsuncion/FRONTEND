import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SesionesDeTrabajoEditarComponent } from './sesiones-de-trabajo-editar.component';

describe('SesionesDeTrabajoEditarComponent', () => {
  let component: SesionesDeTrabajoEditarComponent;
  let fixture: ComponentFixture<SesionesDeTrabajoEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SesionesDeTrabajoEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SesionesDeTrabajoEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
