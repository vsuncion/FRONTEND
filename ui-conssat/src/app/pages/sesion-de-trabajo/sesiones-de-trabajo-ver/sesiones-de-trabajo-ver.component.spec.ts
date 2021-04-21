import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SesionesDeTrabajoVerComponent } from './sesiones-de-trabajo-ver.component';

describe('SesionesDeTrabajoVerComponent', () => {
  let component: SesionesDeTrabajoVerComponent;
  let fixture: ComponentFixture<SesionesDeTrabajoVerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SesionesDeTrabajoVerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SesionesDeTrabajoVerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
