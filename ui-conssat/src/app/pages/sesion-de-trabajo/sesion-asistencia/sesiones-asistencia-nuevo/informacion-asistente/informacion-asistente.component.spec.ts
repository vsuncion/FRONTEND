import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionAsistenteComponent } from './informacion-asistente.component';

describe('InformacionAsistenteComponent', () => {
  let component: InformacionAsistenteComponent;
  let fixture: ComponentFixture<InformacionAsistenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformacionAsistenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacionAsistenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
