import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosDeSesionComponent } from './datos-de-sesion.component';

describe('DatosDeSesionComponent', () => {
  let component: DatosDeSesionComponent;
  let fixture: ComponentFixture<DatosDeSesionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatosDeSesionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosDeSesionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
