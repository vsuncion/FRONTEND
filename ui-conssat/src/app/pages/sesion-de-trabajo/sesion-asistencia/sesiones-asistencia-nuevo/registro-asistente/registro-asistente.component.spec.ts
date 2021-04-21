import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroAsistenteComponent } from './registro-asistente.component';

describe('RegistroAsistenteComponent', () => {
  let component: RegistroAsistenteComponent;
  let fixture: ComponentFixture<RegistroAsistenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroAsistenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroAsistenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
