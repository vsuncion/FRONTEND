import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SesionesActaNuevoComponent } from './sesiones-acta-nuevo.component';

describe('SesionesActaNuevoComponent', () => {
  let component: SesionesActaNuevoComponent;
  let fixture: ComponentFixture<SesionesActaNuevoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SesionesActaNuevoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SesionesActaNuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
