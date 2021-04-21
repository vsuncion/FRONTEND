import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SesionesActaEditarComponent } from './sesiones-acta-editar.component';

describe('SesionesActaEditarComponent', () => {
  let component: SesionesActaEditarComponent;
  let fixture: ComponentFixture<SesionesActaEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SesionesActaEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SesionesActaEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
