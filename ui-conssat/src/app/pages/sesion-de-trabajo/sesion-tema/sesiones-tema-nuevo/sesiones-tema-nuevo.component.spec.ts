import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SesionesTemaNuevoComponent } from './sesiones-tema-nuevo.component';

describe('SesionesTemaNuevoComponent', () => {
  let component: SesionesTemaNuevoComponent;
  let fixture: ComponentFixture<SesionesTemaNuevoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SesionesTemaNuevoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SesionesTemaNuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
