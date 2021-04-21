import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SesionesDeTrabajoComponent } from './sesiones-de-trabajo.component';

describe('SesionesDeTrabajoComponent', () => {
  let component: SesionesDeTrabajoComponent;
  let fixture: ComponentFixture<SesionesDeTrabajoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SesionesDeTrabajoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SesionesDeTrabajoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
