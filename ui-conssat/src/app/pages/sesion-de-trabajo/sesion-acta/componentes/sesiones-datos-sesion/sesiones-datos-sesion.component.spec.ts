import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SesionesDatosSesionComponent } from './sesiones-datos-sesion.component';

describe('SesionesDatosSesionComponent', () => {
  let component: SesionesDatosSesionComponent;
  let fixture: ComponentFixture<SesionesDatosSesionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SesionesDatosSesionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SesionesDatosSesionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
