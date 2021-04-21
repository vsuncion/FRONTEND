import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SesionesAcuerdoComponent } from './sesiones-acuerdo.component';

describe('SesionesAcuerdoComponent', () => {
  let component: SesionesAcuerdoComponent;
  let fixture: ComponentFixture<SesionesAcuerdoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SesionesAcuerdoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SesionesAcuerdoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
