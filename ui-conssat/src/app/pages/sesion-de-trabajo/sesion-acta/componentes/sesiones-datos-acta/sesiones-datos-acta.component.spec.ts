import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SesionesDatosActaComponent } from './sesiones-datos-acta.component';

describe('SesionesDatosActaComponent', () => {
  let component: SesionesDatosActaComponent;
  let fixture: ComponentFixture<SesionesDatosActaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SesionesDatosActaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SesionesDatosActaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
