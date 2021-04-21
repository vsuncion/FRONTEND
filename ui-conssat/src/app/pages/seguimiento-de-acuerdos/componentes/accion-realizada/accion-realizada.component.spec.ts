import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccionRealizadaComponent } from './accion-realizada.component';

describe('AccionRealizadaComponent', () => {
  let component: AccionRealizadaComponent;
  let fixture: ComponentFixture<AccionRealizadaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccionRealizadaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccionRealizadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
