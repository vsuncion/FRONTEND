import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoletinesEditarComponent } from './boletines-editar.component';

describe('BoletinesEditarComponent', () => {
  let component: BoletinesEditarComponent;
  let fixture: ComponentFixture<BoletinesEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoletinesEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoletinesEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
