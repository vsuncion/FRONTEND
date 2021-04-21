import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeguimientoActaComponent } from './seguimiento-acta.component';

describe('SeguimientoActaComponent', () => {
  let component: SeguimientoActaComponent;
  let fixture: ComponentFixture<SeguimientoActaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeguimientoActaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeguimientoActaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
