import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanesDeTrabajoComponent } from './planes-de-trabajo.component';

describe('PlanesDeTrabajoComponent', () => {
  let component: PlanesDeTrabajoComponent;
  let fixture: ComponentFixture<PlanesDeTrabajoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanesDeTrabajoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanesDeTrabajoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
